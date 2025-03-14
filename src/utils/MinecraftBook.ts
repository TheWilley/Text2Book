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

/**
 * Creates a character lexicon of glyphs.
 * @returns The character lexicon.
 */
function createCharacterLexicon() {
  const characterLexicon = [];
  for (const glyph of glyphs) {
    characterLexicon.push({ char: glyph.char, pixels: glyph.pixels });
  }
  return characterLexicon;
}

class StringWrapper {
  private _charLexicon: { char: string; pixels: number }[];
  public removedCharacters: string[];

  constructor() {
    this._charLexicon = createCharacterLexicon();
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
    const minecraftCharacter = this._charLexicon.find((character) => character.char == c);

    if (!minecraftCharacter) {
      this.removedCharacters.push(c);
    }

    if (minecraftCharacter) {
      if (minecraftCharacter.char === ' ') {
        return minecraftCharacter.pixels;
      } else {
        return minecraftCharacter.pixels + 1;
      }
    } else {
      return 0;
    }
  }

  private wrapFormattedStringToWidth(str: string, wrapWidth: number): string {
    const result: string[] = [];
    let remainingStr = str;

    while (remainingStr.length > 0) {
      const i = this.sizeStringToWidth(remainingStr, wrapWidth);
      const s = remainingStr.substring(0, i);
      const c0 = remainingStr.charAt(i);
      const flag = c0 == ' ' || c0 == '\n';
      remainingStr = remainingStr.substring(i + (flag ? 1 : 0));
      result.push(s);
    }

    return result.join('\n');
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
    // Destructure required parameters
    this._generationFormat = generationFormat;
    this._minecraftVersion = minecraftVersion;
    this._title = title;
    this._author = author;

    // Handle optional parameters and enforce validation
    this._linesPerPage = Math.min(linesPerPage, 14); // Ensure linesPerPage does not exceed 14
    this._nameSuffix = nameSuffix;
    this._javaVersion = javaVersion;

    // Initialize the string wrapper and split the input text into lines
    this._stringWrapper = new StringWrapper();
    this._lines = this._stringWrapper.getSplitString(text);

    // Generate the book and track removed characters
    this.book = this.createOutput();
    this.removedCharacters = [...new Set(this._stringWrapper.removedCharacters)];
  }

  private escapeCharacters(text: string): string {
    switch (this._generationFormat) {
      case 'commands':
        return text
          .replace(/"/g, '\\\\' + '"') // Escape double quotes (")
          .replace(/'/g, '\\' + "'") // Escape single quotes (')
          .trim() // Remove whitespace from both ends of the string ( )
          .replace(/\n/g, '\\\\n'); // Escape new lines (\n)
      case 'text':
        return text.trim().replace(/\n/g, ' '); // For 'text' format, just trim the string
      default:
        return text; // Return the original string if no format is specified
    }
  }

  private encapsulateText(text: string): string {
    switch (this._generationFormat) {
      case 'commands':
        return `'{"text":"${text}"}'`;
      case 'text':
        return text;
      default:
        return '';
    }
  }

  private finalizeBook(): string {
    const suffix = this._nameSuffix.replace('[n]', this._booksCounter.toString());

    if (this._generationFormat === 'commands') {
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
    }

    return '';
  }

  private createBook(lines: string[]): string {
    let counter = 0;
    let workerLine = '';

    this._pages = lines.reduce<string[]>((pages, line) => {
      workerLine += line + '\n';
      counter++;

      if (counter === this._linesPerPage) {
        const escapedText = this.escapeCharacters(workerLine);
        const page = this.encapsulateText(escapedText);

        // Reset for the next page
        workerLine = '';
        counter = 0;

        pages.push(page);
      }
      return pages;
    }, []);

    // Handle remaining lines if not empty
    if (workerLine.length > 0) {
      const escapedText = this.escapeCharacters(workerLine);
      const page = this.encapsulateText(escapedText);
      this._pages.push(page);
    }

    return this.finalizeBook();
  }

  private createOutput(): string[] {
    const library: string[] = [];
    const lineLimit = this.calculateLineLimit();

    let startIndex = 0;

    while (startIndex < this._lines.length) {
      const endIndex = Math.min(startIndex + lineLimit, this._lines.length);
      const splicedLines = this._lines.slice(startIndex, endIndex);

      const book = this.createBook(splicedLines);
      library.push(book);

      startIndex = endIndex;
      this._booksCounter++;
    }

    return library;
  }

  private calculateLineLimit(): number {
    if (this._generationFormat === 'commands') {
      return this._minecraftVersion === 'bedrock'
        ? this._linesPerPage * 50
        : this._linesPerPage * 100;
    } else if (this._generationFormat === 'text') {
      return this._linesPerPage;
    }
    return 0;
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
