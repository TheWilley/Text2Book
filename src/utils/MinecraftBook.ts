export type BookParameters = {
  text: string;
  title: string;
  author: string;
  minecraftVersion: 'java' | 'bedrock';
  generationFormat: 'commands' | 'text';
  linesPerPage?: number;
  nameSuffix?: string;
};
export type BookOutput = string[];
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
  private _characterLexicon: MinecraftCharacter[] = [
    new MinecraftCharacter('À', 6),
    new MinecraftCharacter('Á', 6),
    new MinecraftCharacter('Â', 6),
    new MinecraftCharacter('È', 6),
    new MinecraftCharacter('Ê', 6),
    new MinecraftCharacter('Ë', 6),
    new MinecraftCharacter('Í', 4),
    new MinecraftCharacter('Ó', 6),
    new MinecraftCharacter('Ô', 6),
    new MinecraftCharacter('Õ', 6),
    new MinecraftCharacter('Ú', 6),
    new MinecraftCharacter('ß', 6),
    new MinecraftCharacter('ã', 6),
    new MinecraftCharacter('õ', 6),
    new MinecraftCharacter('ğ', 6),
    new MinecraftCharacter('İ', 4),
    new MinecraftCharacter('ı', 4),
    new MinecraftCharacter('Œ', 6),
    new MinecraftCharacter('œ', 7),
    new MinecraftCharacter('Ş', 6),
    new MinecraftCharacter('ş', 6),
    new MinecraftCharacter('Ŵ', 6),
    new MinecraftCharacter('ŵ', 6),
    new MinecraftCharacter('ž', 6),
    new MinecraftCharacter('ȇ', 6),
    new MinecraftCharacter('!', 2),
    new MinecraftCharacter('"', 5),
    new MinecraftCharacter('#', 6),
    new MinecraftCharacter('$', 6),
    new MinecraftCharacter('%', 6),
    new MinecraftCharacter('&', 6),
    new MinecraftCharacter('\'', 3),
    new MinecraftCharacter('(', 5),
    new MinecraftCharacter(')', 5),
    new MinecraftCharacter('*', 5),
    new MinecraftCharacter('+', 6),
    new MinecraftCharacter(',', 2),
    new MinecraftCharacter('-', 6),
    new MinecraftCharacter('.', 2),
    new MinecraftCharacter('/', 6),
    new MinecraftCharacter('0', 6),
    new MinecraftCharacter('1', 6),
    new MinecraftCharacter('2', 6),
    new MinecraftCharacter('3', 6),
    new MinecraftCharacter('4', 6),
    new MinecraftCharacter('5', 6),
    new MinecraftCharacter('6', 6),
    new MinecraftCharacter('7', 6),
    new MinecraftCharacter('8', 6),
    new MinecraftCharacter('9', 6),
    new MinecraftCharacter(':', 2),
    new MinecraftCharacter(';', 2),
    new MinecraftCharacter('<', 5),
    new MinecraftCharacter('=', 6),
    new MinecraftCharacter('>', 5),
    new MinecraftCharacter('?', 6),
    new MinecraftCharacter('@', 7),
    new MinecraftCharacter('A', 6),
    new MinecraftCharacter('B', 6),
    new MinecraftCharacter('C', 6),
    new MinecraftCharacter('D', 6),
    new MinecraftCharacter('E', 6),
    new MinecraftCharacter('F', 6),
    new MinecraftCharacter('G', 6),
    new MinecraftCharacter('H', 6),
    new MinecraftCharacter('I', 4),
    new MinecraftCharacter('J', 6),
    new MinecraftCharacter('K', 6),
    new MinecraftCharacter('L', 6),
    new MinecraftCharacter('M', 6),
    new MinecraftCharacter('N', 6),
    new MinecraftCharacter('O', 6),
    new MinecraftCharacter('P', 6),
    new MinecraftCharacter('Q', 6),
    new MinecraftCharacter('R', 6),
    new MinecraftCharacter('S', 6),
    new MinecraftCharacter('T', 6),
    new MinecraftCharacter('U', 6),
    new MinecraftCharacter('V', 6),
    new MinecraftCharacter('W', 6),
    new MinecraftCharacter('X', 6),
    new MinecraftCharacter('Y', 6),
    new MinecraftCharacter('Z', 6),
    new MinecraftCharacter('[', 4),
    new MinecraftCharacter(']', 4),
    new MinecraftCharacter('^', 6),
    new MinecraftCharacter('_', 6),
    new MinecraftCharacter('`', 3),
    new MinecraftCharacter('a', 6),
    new MinecraftCharacter('b', 6),
    new MinecraftCharacter('c', 6),
    new MinecraftCharacter('d', 6),
    new MinecraftCharacter('e', 6),
    new MinecraftCharacter('f', 5),
    new MinecraftCharacter('g', 6),
    new MinecraftCharacter('h', 6),
    new MinecraftCharacter('i', 2),
    new MinecraftCharacter('j', 6),
    new MinecraftCharacter('k', 5),
    new MinecraftCharacter('l', 3),
    new MinecraftCharacter('m', 6),
    new MinecraftCharacter('n', 6),
    new MinecraftCharacter('o', 6),
    new MinecraftCharacter('p', 6),
    new MinecraftCharacter('q', 6),
    new MinecraftCharacter('r', 6),
    new MinecraftCharacter('s', 6),
    new MinecraftCharacter('t', 4),
    new MinecraftCharacter('u', 6),
    new MinecraftCharacter('v', 6),
    new MinecraftCharacter('w', 6),
    new MinecraftCharacter('x', 6),
    new MinecraftCharacter('y', 6),
    new MinecraftCharacter('z', 6),
    new MinecraftCharacter('‘', 3),
    new MinecraftCharacter('’', 3),
    new MinecraftCharacter('{', 5),
    new MinecraftCharacter('|', 2),
    new MinecraftCharacter('}', 5),
    new MinecraftCharacter('~', 7),
    new MinecraftCharacter('–', 7),
    new MinecraftCharacter('Ç', 6),
    new MinecraftCharacter('ü', 6),
    new MinecraftCharacter('é', 6),
    new MinecraftCharacter('â', 6),
    new MinecraftCharacter('ä', 6),
    new MinecraftCharacter('à', 6),
    new MinecraftCharacter('å', 6),
    new MinecraftCharacter('ç', 6),
    new MinecraftCharacter('ê', 6),
    new MinecraftCharacter('ë', 6),
    new MinecraftCharacter('è', 6),
    new MinecraftCharacter('ï', 4),
    new MinecraftCharacter('î', 6),
    new MinecraftCharacter('ì', 3),
    new MinecraftCharacter('Ä', 6),
    new MinecraftCharacter('Å', 6),
    new MinecraftCharacter('É', 6),
    new MinecraftCharacter('æ', 6),
    new MinecraftCharacter('Æ', 6),
    new MinecraftCharacter('ô', 6),
    new MinecraftCharacter('ö', 6),
    new MinecraftCharacter('ò', 6),
    new MinecraftCharacter('û', 6),
    new MinecraftCharacter('ù', 6),
    new MinecraftCharacter('ÿ', 6),
    new MinecraftCharacter('Ö', 6),
    new MinecraftCharacter('Ü', 6),
    new MinecraftCharacter('ø', 6),
    new MinecraftCharacter('£', 6),
    new MinecraftCharacter('Ø', 6),
    new MinecraftCharacter('×', 4),
    new MinecraftCharacter('ƒ', 6),
    new MinecraftCharacter('á', 6),
    new MinecraftCharacter('í', 3),
    new MinecraftCharacter('ó', 6),
    new MinecraftCharacter('ú', 6),
    new MinecraftCharacter('ñ', 6),
    new MinecraftCharacter('Ñ', 6),
    new MinecraftCharacter('ª', 6),
    new MinecraftCharacter('º', 6),
    new MinecraftCharacter('¿', 6),
    new MinecraftCharacter('®', 7),
    new MinecraftCharacter('¬', 6),
    new MinecraftCharacter('½', 6),
    new MinecraftCharacter('¼', 6),
    new MinecraftCharacter('¡', 2),
    new MinecraftCharacter('«', 6),
    new MinecraftCharacter('»', 6),
    new MinecraftCharacter('░', 8),
    new MinecraftCharacter('▒', 9),
    new MinecraftCharacter('▓', 9),
    new MinecraftCharacter('│', 6),
    new MinecraftCharacter('┤', 6),
    new MinecraftCharacter('╡', 6),
    new MinecraftCharacter('╢', 8),
    new MinecraftCharacter('╖', 8),
    new MinecraftCharacter('╕', 6),
    new MinecraftCharacter('╣', 8),
    new MinecraftCharacter('║', 8),
    new MinecraftCharacter('╗', 8),
    new MinecraftCharacter('╝', 8),
    new MinecraftCharacter('╜', 8),
    new MinecraftCharacter('╛', 6),
    new MinecraftCharacter('┐', 6),
    new MinecraftCharacter('└', 9),
    new MinecraftCharacter('┴', 9),
    new MinecraftCharacter('┬', 9),
    new MinecraftCharacter('├', 9),
    new MinecraftCharacter('─', 9),
    new MinecraftCharacter('┼', 9),
    new MinecraftCharacter('╞', 9),
    new MinecraftCharacter('╟', 9),
    new MinecraftCharacter('╚', 9),
    new MinecraftCharacter('╔', 9),
    new MinecraftCharacter('╩', 9),
    new MinecraftCharacter('╦', 9),
    new MinecraftCharacter('╠', 9),
    new MinecraftCharacter('═', 9),
    new MinecraftCharacter('╬', 9),
    new MinecraftCharacter('╧', 9),
    new MinecraftCharacter('╨', 9),
    new MinecraftCharacter('╤', 9),
    new MinecraftCharacter('╥', 9),
    new MinecraftCharacter('╙', 9),
    new MinecraftCharacter('╘', 9),
    new MinecraftCharacter('╒', 9),
    new MinecraftCharacter('╓', 9),
    new MinecraftCharacter('╫', 9),
    new MinecraftCharacter('╪', 9),
    new MinecraftCharacter('┘', 6),
    new MinecraftCharacter('┌', 9),
    new MinecraftCharacter('█', 9),
    new MinecraftCharacter('▄', 9),
    new MinecraftCharacter('▌', 5),
    new MinecraftCharacter('▐', 9),
    new MinecraftCharacter('▀', 9),
    new MinecraftCharacter('α', 8),
    new MinecraftCharacter('β', 7),
    new MinecraftCharacter('Γ', 7),
    new MinecraftCharacter('π', 8),
    new MinecraftCharacter('Σ', 7),
    new MinecraftCharacter('σ', 8),
    new MinecraftCharacter('μ', 8),
    new MinecraftCharacter('τ', 8),
    new MinecraftCharacter('Φ', 7),
    new MinecraftCharacter('Θ', 8),
    new MinecraftCharacter('Ω', 8),
    new MinecraftCharacter('δ', 7),
    new MinecraftCharacter('∞', 9),
    new MinecraftCharacter('∅', 9),
    new MinecraftCharacter('∈', 6),
    new MinecraftCharacter('∩', 7),
    new MinecraftCharacter('≡', 7),
    new MinecraftCharacter('±', 7),
    new MinecraftCharacter('≥', 7),
    new MinecraftCharacter('≤', 7),
    new MinecraftCharacter('⌠', 9),
    new MinecraftCharacter('⌡', 6),
    new MinecraftCharacter('÷', 7),
    new MinecraftCharacter('≈', 8),
    new MinecraftCharacter('°', 7),
    new MinecraftCharacter('∙', 6),
    new MinecraftCharacter('·', 6),
    new MinecraftCharacter('√', 9),
    new MinecraftCharacter('ⁿ', 7),
    new MinecraftCharacter('²', 6),
    new MinecraftCharacter('■', 7),
    new MinecraftCharacter(' ', 4),
    new MinecraftCharacter('\n', 0),
  ];

  get characterLexicon(): MinecraftCharacter[] {
    return this._characterLexicon;
  }
}

class Calculator {
  private _text: string;

  constructor(text: string) {
    this._text = text;
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
        text = text.substring(0, i) + text.substring(i + 1);
        i--;
        continue;
      }

      // Add the pixels
      totalPixels += minecraftCharacter.pixels;

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
        if (words[e].word === '\n' || (words[e].word != ' ' && sum > 114)) {
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
  private _lines: string[];
  private _pages: string[] = [];
  private _workerLine = '';
  private _linesPerPage: number;
  private _nameSuffix: string;
  private _booksCounter = 0;
  public book: BookOutput = [];

  constructor({
    generationFormat,
    minecraftVersion,
    title,
    author,
    linesPerPage = 14,
    nameSuffix = '',
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

    // Create the book
    this._calculator = new Calculator(text);
    this._lines = this._calculator.convertTextToLines();
    this.book = this.createOutput();
  }

  /**
   * Escapes characters or trims the line based on the output format.
   */
  private escapeCharacters() {
    if (this._generationFormat === 'commands') {
      this._workerLine = this._workerLine
        .replace(/"/g, '\\\\' + '"') // Escape double quotes (")
        .replace(/'/g, '\\' + '\'') // Escape single quotes (')
        .trim() // Remove whitespace from both ends of the string ( )
        .replace(/\n/g, '\\\\n'); // Escape new lines (\n)
    } else if (this._generationFormat === 'text') {
      this._workerLine = this._workerLine.trim();
    } else {
      this._workerLine = '';
    }
  }

  /**
   * Encapsulates the text with the correct format based on the output format.
   * @returns The encapsulated text based on the output format.
   */
  private encapsuleText() {
    if (this._generationFormat === 'commands') {
      return `'{"text":"${this._workerLine}"}'`;
    } else if (this._generationFormat === 'text') {
      return this._workerLine;
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
      return `/give @p minecraft:written_book{pages:[${this._pages.toString()}], title: "${this._title + suffix}", author: "${this._author}"}`;
    } else if (this._generationFormat === 'text') {
      return this._pages.toString();
    } else {
      return '';
    }
  }

  /**
   * Creates a book item based on the output format.
   */
  private createBook(lines: string[]) {
    let counter = 0;

    this._pages = lines
      .map((line) => {
        this._workerLine += line;
        counter++;

        if (counter == this._linesPerPage) {
          // Create text string
          this.escapeCharacters();
          const page = this.encapsuleText();

          // Reset lines and counter
          this._workerLine = '';
          counter = 0;

          // Finally return the string
          return page;
        } else {
          return null;
        }
      })
      .filter((page) => page !== null) as string[];

    // Add the remaining lines to the page strings
    if (this._workerLine.length > 0) {
      this.escapeCharacters();
      const page = this.encapsuleText();
      this._pages.push(page);
    }

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
      // 13 lines for each page
      lineLimit = 13;
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
    return new BookGenerator(this._bookParameters).book;
  }

  get bookParameters() {
    return this._bookParameters;
  }
}

export function generateBook(bookParameters: BookParameters) {
  return new BookGenerator(bookParameters).book;
}