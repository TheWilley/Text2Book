import glyphs from '../data/glyphs.json';

export type BookParameters = {
  text: string;
  title: string;
  author: string;
  minecraftVersion: 'java' | 'bedrock';
  generationFormat: 'commands' | 'text';
  javaVersion: '1.20.4' | '1.20.5';
  linesPerPage?: number;
  nameSuffix?: string;
};
export type BookOutput = { book: string[]; removedCharacters: string[] };

class MinecraftCharacter {
  private _char: string;
  private _pixels: number;

  constructor(char: string, pixels: number) {
    this._char = char;
    this._pixels = pixels;
  }

  set letter(letter: string) {
    this._char = letter;
  }

  get letter() {
    return this._char;
  }

  set pixels(pixels: number) {
    this._pixels = pixels;
  }

  get pixels() {
    return this._pixels;
  }
}

class CharacterLexicon {
  private _characterLexicon: MinecraftCharacter[] = [new MinecraftCharacter('\n', 0)];

  constructor() {
    for (const glyph of glyphs) {
      this._characterLexicon.push(new MinecraftCharacter(glyph.char, glyph.pixels));
    }
  }

  get characterLexicon(): MinecraftCharacter[] {
    return this._characterLexicon;
  }
}

class StringWrapper {
  private _charLexicon: MinecraftCharacter[];
  public removedCharacters: string[];

  constructor() {
    this._charLexicon = new CharacterLexicon().characterLexicon;
    this.removedCharacters = [];
  }

  private sizeStringToWidth(str: string, wrapWidth: number) {
    const i = str.length;
    let f = 0;
    let j = 0;
    let k = -1;

    for (let flag = false; j < i; ++j) {
      const c0 = str.charAt(j);

      switch (c0) {
        case '\n': {
          --j;
          break;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        case ' ': {
          k = j;
        }

        // eslint-disable-next-line no-fallthrough
        default: {
          f += this.getCharWidth(c0);

          if (flag) {
            ++f;
          }
          break;
        }

        case '\u00a7':
          if (j < i - 1) {
            ++j;
            const c1 = str.charAt(j);

            if (c1 !== 'l' && c1 !== 'L') {
              if (c1 === 'r' || c1 === 'R') {
                flag = false;
              }
            } else {
              flag = true;
            }
          }
      }

      if (c0 === '\n') {
        ++j;
        k = j;
        break;
      }

      if (f > wrapWidth) {
        break;
      }
    }

    return j !== i && k !== -1 && k < j ? k : j;
  }

  private getCharWidth(c: string) {
    const minecraftCharacter = this._charLexicon.find(
      (character) => character.letter == c
    );

    if (!minecraftCharacter) {
      this.removedCharacters.push(c);
    }

    if (minecraftCharacter) {
      if (minecraftCharacter.letter === ' ') {
        return minecraftCharacter.pixels;
      } else {
        return minecraftCharacter.pixels + 1;
      }
    } else {
      return 0;
    }
  }

  private wrapFormattedStringToWidth(str: string, wrapWidth: number): string {
    const i = this.sizeStringToWidth(str, wrapWidth);

    if (str.length <= i) {
      return str;
    } else {
      const s = str.substring(0, i);
      const c0 = str.charAt(i);
      const flag = c0 == ' ' || c0 == '\n';
      const s1 = str.substring(i + (flag ? 1 : 0));
      return s + '\n' + this.wrapFormattedStringToWidth(s1, wrapWidth);
    }
  }

  private listFormattedStringToWidth(str: string, wrapWidth: number) {
    return this.wrapFormattedStringToWidth(str, wrapWidth).split('\n');
  }

  private trimStringNewline(text: string) {
    while (text && text.endsWith('\n')) {
      text = text.substring(0, text.length - 1);
    }
    return text;
  }

  public getSplitString(str: string) {
    str = this.trimStringNewline(str);
    return this.listFormattedStringToWidth(str, 114);
  }
}

class BookGenerator {
  private _stringWrapper: StringWrapper;
  private _title: string;
  private _author: string;
  private _minecraftVersion: 'java' | 'bedrock';
  private _generationFormat: 'commands' | 'text';
  private _javaVersion: '1.20.4' | '1.20.5';
  private _lines: string[];
  private _pages: string[] = [];
  private _linesPerPage: number;
  private _nameSuffix: string;
  private _booksCounter = 0;
  public book: string[] = [];
  public removedCharacters: string[] = [];

  constructor({
    generationFormat,
    minecraftVersion,
    title,
    author,
    linesPerPage = 14,
    nameSuffix = '',
    javaVersion = '1.20.4',
    text,
  }: BookParameters) {
    // Required parameters
    this._generationFormat = generationFormat;
    this._minecraftVersion = minecraftVersion;
    this._title = title;
    this._author = author;

    // Optional parameters
    this._linesPerPage = linesPerPage > 14 ? 14 : linesPerPage;
    this._nameSuffix = nameSuffix;
    this._javaVersion = javaVersion;

    // Create the book
    this._stringWrapper = new StringWrapper();
    this._lines = this._stringWrapper.getSplitString(text);
    this.book = this.createOutput();
    this.removedCharacters = [...new Set(this._stringWrapper.removedCharacters)];
  }

  /**
   * Escapes characters or trims the line based on the output format.
   */
  private escapeCharacters(text: string) {
    if (this._generationFormat === 'commands') {
      return text
        .replace(/"/g, '\\\\' + '"') // Escape double quotes (")
        .replace(/'/g, '\\' + "'") // Escape single quotes (')
        .trim() // Remove whitespace from both ends of the string ( )
        .replace(/\n/g, '\\\\n'); // Escape new lines (\n)
    } else if (this._generationFormat === 'text') {
      return text.trim();
    } else {
      return '';
    }
  }

  /**
   * Encapsulates the text with the correct format based on the output format.
   * @returns The encapsulated text based on the output format.
   */
  private encapsuleText(text: string) {
    if (this._generationFormat === 'commands') {
      return `'{"text":"${text}"}'`;
    } else if (this._generationFormat === 'text') {
      return text;
    } else {
      return '';
    }
  }

  /**
   * Finalizes the book based on the output format.
   * @returns The finalized book based on the output format.
   */
  private finalizeBook() {
    if (this._generationFormat === 'commands') {
      const suffix = this._nameSuffix.replace('n', this._booksCounter.toString());

      if (this._minecraftVersion === 'java') {
        if (this._javaVersion === '1.20.5') {
          return `/give @p written_book[written_book_content={title:"${this._title + suffix}",author:"${this._author}",pages:[${this._pages.toString()}]}] 1`;
        } else if (this._javaVersion === '1.20.4') {
          return `/give @p minecraft:written_book{pages:[${this._pages.toString()}], title: "${this._title + suffix}", author: "${this._author}"}`;
        }
      } else if (this._minecraftVersion === 'bedrock') {
        // FIXME: This is probably the incorrect format for bedrock
        return `/give @p written_book[written_book_content={title:"${this._title + suffix}",author:"${this._author}",pages:[${this._pages.toString()}]}] 1`;
      }
    } else if (this._generationFormat === 'text') {
      return this._pages.toString();
    } else {
      return '';
    }

    return '';
  }

  /**
   * Creates a book item based on the output format.
   */
  private createBook(lines: string[]) {
    let counter = 0;
    let workerLine = '';

    this._pages = lines
      .map((line) => {
        workerLine += line + '\n';
        counter++;

        if (counter == this._linesPerPage) {
          // Create text string
          const escapedText = this.escapeCharacters(workerLine);
          const page = this.encapsuleText(escapedText);

          // Reset lines and counter
          workerLine = '';
          counter = 0;

          // Finally return the string
          return page;
        } else {
          return null;
        }
      })
      .filter((page) => page !== null) as string[];

    // Add the remaining lines to the page strings
    if (workerLine.length > 0) {
      const escapedText = this.escapeCharacters(workerLine);
      const page = this.encapsuleText(escapedText);
      this._pages.push(page);
    }

    // Must reset, otherwise workerline will be preserved
    workerLine = '';

    return this.finalizeBook();
  }

  private createOutput() {
    const library: string[] = [];
    const copyOfLines = [...this._lines];
    let numberOfLines = 0;
    let lineLimit = 0;

    if (this._generationFormat === 'commands') {
      lineLimit =
        this._minecraftVersion === 'bedrock'
          ? this._linesPerPage * 50
          : this._linesPerPage * 100;
    } else if (this._generationFormat === 'text') {
      lineLimit = this._linesPerPage || 14;
    }

    for (let i = 0; i <= this._lines.length; i++) {
      numberOfLines++;

      if (numberOfLines == lineLimit || i == this._lines.length) {
        const splicedLines = copyOfLines.splice(0, numberOfLines);
        const book = this.createBook(splicedLines);
        numberOfLines = 0;
        this._booksCounter++;
        library.push(book);
      }
    }

    return library;
  }
}

export default class MinecraftBook {
  private _bookParameters: BookParameters;

  constructor(bookParameters: BookParameters) {
    this._bookParameters = bookParameters;
  }

  generateBook() {
    const bookGenerator = new BookGenerator(this.bookParameters);
    return {
      book: bookGenerator.book,
      removedCharacters: bookGenerator.removedCharacters,
    };
  }

  get bookParameters() {
    return this._bookParameters;
  }
}
