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
type PixelsOfWord = { word: string; value: number }[];

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

class Calculator {
  public removedCharacters: string[];
  private _text: string;

  constructor(text: string) {
    this._text = text;
    this.removedCharacters = [];
  }

  private convertTextToPixels(text: string) {
    const words: PixelsOfWord = [],
      allCharacters = new CharacterLexicon().characterLexicon,
      ms = 114;
    let totalPixels = 0,
      substringedWord = '';

    // Go through each letter
    for (let i = 0; i < text.length; i++) {
      // Get the character
      const minecraftCharacter = allCharacters.find(
        (character) => character.letter == text.charAt(i)
      );

      // If the character is not found, remove it and break the loop
      if (!minecraftCharacter) {
        const beforeRemovedCharacter = text.substring(0, i);
        const removedCharacter = text.substring(i, i + 1);
        const afterRemovedCharacter = text.substring(i + 1);

        text = beforeRemovedCharacter + afterRemovedCharacter;

        // Since we removed a character we need to reduce length here
        i--;

        this.removedCharacters.push(removedCharacter);

        continue;
      }

      // Add the pixels
      // An additional pixel is added as the old list included the space in between characters
      if (minecraftCharacter.letter === ' ') {
        totalPixels += minecraftCharacter.pixels;
      } else {
        totalPixels += minecraftCharacter.pixels + 1;
      }

      // Set the substringed word
      substringedWord = text.substring(0, i + 1);

      // Check if the sum is bigger than the max sum
      if (totalPixels > ms) {
        // Remove the last letter
        substringedWord = substringedWord.substring(0, substringedWord.length - 1);

        // Add the word to the array
        words.push({
          word: substringedWord,
          value: totalPixels - minecraftCharacter.pixels,
        });

        // Remove the word from the string including the last letter
        text = text.substring(i);

        // Reset the index and sum
        totalPixels = 0;
        i = -1;
      }
    }

    // Add the last word
    words.push({ word: text, value: totalPixels });

    // Return the words
    return words;
  }

  public convertTextToLines() {
    let lines: string[] = [],
      words: PixelsOfWord = [],
      sum = 0;
    const modifedLines = [];

    // Removes all trailing spaces of new lines
    // Splits the text into words to calculate their lengths separately
    const splicedWords = this._text.replace(/ +\n/g, '\n').split(/(\s)/g);

    // Go through each word
    for (let i = 0; i < splicedWords.length; i++) {
      // Get the sum of the words letters
      words = this.convertTextToPixels(splicedWords[i]);

      // Go through each word
      for (let e = 0; e < words.length; e++) {
        // Add the sum of the letters and the spaces
        sum += words[e].value;

        // If the sum is bigger than 114, reset the sum to the word which caused the overflow
        // The reason we ignore the space is that it will not occupy a space if it's the very last word in the row
        // I guess it has to do something with

        // If the value is over 114 and the character is not a space, go to next
        if (
          words[e].word === '\n' ||
          (words[e].word !== ' ' && sum > 114) ||
          (words[e].word === ' ' && sum >= 119)
        ) {
          sum = words[e].value;

          modifedLines.push(lines.join(''));
          lines = [];
        }

        // Add the letters to the lines
        lines.push(words[e].word);
      }
    }

    // Add the rest of the words to the lines
    modifedLines.push(lines.join('').trim());

    // Return the lines and remove empty lines
    return modifedLines.filter((r) => r != '');
  }
}

class BookGenerator {
  private _calculator: Calculator;
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
    this._calculator = new Calculator(text);
    this._lines = this._calculator.convertTextToLines();
    this.book = this.createOutput();
    this.removedCharacters = [...new Set(this._calculator.removedCharacters)];
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
        workerLine += line;
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
      // x lines * 50 characters per line = 650 characters
      // x lines * 100 characters per line = 1300 characters
      lineLimit =
        this._minecraftVersion === 'bedrock'
          ? this._linesPerPage * 50
          : this._linesPerPage * 100;
    } else if (this._generationFormat === 'text') {
      // 14 lines for each page
      lineLimit = this._linesPerPage || 14;
    }

    // Go through each line
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

export function generateBook(bookParameters: BookParameters) {
  const bookGenerator = new BookGenerator(bookParameters);
  return { book: bookGenerator.book, removedCharacters: bookGenerator.removedCharacters };
}
