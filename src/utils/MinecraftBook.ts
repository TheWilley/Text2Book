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
type MinecraftCharacter = { char: string; pixels: number };

/**
 * Creates a character lexicon of glyphs.
 *
 * @returns The character lexicon.
 */
function createCharacterLexicon() {
  const characterLexicon: MinecraftCharacter[] = [];
  for (const glyph of glyphs) {
    characterLexicon.push({ char: glyph.char, pixels: glyph.pixels });
  }
  return characterLexicon;
}

/**
 * Calculates the width of a string and determines the position to wrap the text based on the lexicon and wrap width.
 *
 * @param str The input string to be wrapped.
 * @param wrapWidth The width at which the string should wrap.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns The index where the string should wrap.
 */
function sizeStringToWidth(
  str: string,
  wrapWidth: number,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): number {
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
        f += getCharWidth(c0, lexicon, removedCharacters);

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

/**
 * Retrieves the width of a character from the lexicon. If the character is not found, it's added to the removed characters list.
 *
 * @param c The character whose width is to be calculated.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns The width of the character.
 */
function getCharWidth(
  c: string,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): number {
  const minecraftCharacter = lexicon.find((character) => character.char === c);

  if (!minecraftCharacter) {
    removedCharacters.push(c);
    return 0;
  }

  if (minecraftCharacter.char === ' ') {
    return minecraftCharacter.pixels;
  } else {
    return minecraftCharacter.pixels + 1;
  }
}

/**
 * Wraps the formatted string to fit within the specified width and returns the wrapped string.
 *
 * @param str The string to be wrapped.
 * @param wrapWidth The width at which the string should wrap.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns The wrapped string.
 */
function wrapFormattedStringToWidth(
  str: string,
  wrapWidth: number,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): string {
  const result: string[] = [];
  let remainingStr = str;

  while (remainingStr.length > 0) {
    const i = sizeStringToWidth(remainingStr, wrapWidth, lexicon, removedCharacters);
    const s = remainingStr.substring(0, i);
    const c0 = remainingStr.charAt(i);
    const flag = c0 === ' ' || c0 === '\n';
    remainingStr = remainingStr.substring(i + (flag ? 1 : 0));
    result.push(s);
  }

  return result.join('\n');
}

/**
 * Converts the string to an array of lines by wrapping it to the specified width.
 *
 * @param str The string to be formatted.
 * @param wrapWidth The width at which the string should wrap.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns An array of strings representing the wrapped text.
 */
function listFormattedStringToWidth(
  str: string,
  wrapWidth: number,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): string[] {
  return wrapFormattedStringToWidth(str, wrapWidth, lexicon, removedCharacters).split(
    '\n'
  );
}

/**
 * Removes trailing newlines from the given string.
 *
 * @param text The string to trim.
 * @returns The trimmed string.
 */
function trimStringNewline(text: string): string {
  while (text && text.endsWith('\n')) {
    text = text.substring(0, text.length - 1);
  }
  return text;
}

/**
 * Splits the given string into lines of a maximum width, trimming trailing newlines.
 *
 * @param str The string to split.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns An array of strings representing the wrapped lines.
 */
function getSplitString(
  str: string,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): string[] {
  str = trimStringNewline(str);
  return listFormattedStringToWidth(str, 114, lexicon, removedCharacters);
}

/**
 * Creates a string wrapper object, encapsulating functions to handle string formatting and character removal tracking.
 *
 * @param lexicon The lexicon containing Minecraft character data.
 * @returns The string wrapper object containing the `getSplitString` function and a list of removed characters.
 */
function createStringWrapper(lexicon: MinecraftCharacter[]) {
  const removedCharacters: string[] = [];

  return {
    /**
     * Splits the input string into lines of a maximum width, trimming trailing newlines.
     *
     * @param str The string to split.
     * @returns An array of strings representing the wrapped lines.
     */
    getSplitString: (str: string): string[] =>
      getSplitString(str, lexicon, removedCharacters),

    // The list of characters that were removed from the lexicon.
    removedCharacters,
  };
}

/**
 * Escapes special characters in the text based on the format (commands or text).
 *
 * @param inputText The text to escape.
 * @param generationFormat The format for the book generation (either 'commands' or 'text').
 * @returns The escaped text.
 */
function escapeCharacters(
  inputText: string,
  generationFormat: 'commands' | 'text'
): string {
  switch (generationFormat) {
    case 'commands':
      return inputText
        .replace(/"/g, '\\\\' + '"') // Escape double quotes (")
        .replace(/'/g, '\\' + "'") // Escape single quotes (')
        .trim() // Remove whitespace from both ends of the string ( )
        .replace(/\n/g, '\\\\n'); // Escape newlines (\n)
    case 'text':
      return inputText.trim().replace(/\n/g, ' '); // For 'text' format, just trim the string
    default:
      return inputText; // Return the original string if no format is specified
  }
}

/**
 * Encapsulates the text with additional formatting based on the generation format.
 *
 * @param inputText The text to encapsulate.
 * @param generationFormat The format for the book generation (either 'commands' or 'text').
 * @returns The formatted text.
 */
function encapsulateText(
  inputText: string,
  generationFormat: 'commands' | 'text'
): string {
  switch (generationFormat) {
    case 'commands':
      return `'{"text":"${inputText}"}'`;
    case 'text':
      return inputText;
    default:
      return '';
  }
}

/**
 * Finalizes the book content by generating the proper command or text format based on the selected options.
 *
 * @param pages The pages of the book.
 * @param title The title of the book.
 * @param author The author of the book.
 * @param nameSuffix The suffix for the book name.
 * @param generationFormat The format for the book generation (either 'commands' or 'text').
 * @param minecraftVersion The Minecraft version ('java' or 'bedrock').
 * @param javaVersion The Java version ('1.20.4' or '1.20.5').
 * @param booksCounter The counter for generating multiple books.
 * @returns The final formatted book content.
 */
function finalizeBook(
  pages: string[],
  title: string,
  author: string,
  nameSuffix: string,
  generationFormat: 'commands' | 'text',
  minecraftVersion: 'java' | 'bedrock',
  javaVersion: '1.20.4' | '1.20.5',
  booksCounter: number
) {
  const suffix = nameSuffix.replace('[n]', booksCounter.toString()); // Use counter for book name suffix

  if (generationFormat === 'commands') {
    if (minecraftVersion === 'java') {
      if (javaVersion === '1.20.5') {
        return `/give @p written_book[written_book_content={title:"${title + suffix}",author:"${author}",pages:[${pages.toString()}]}] 1`;
      } else if (javaVersion === '1.20.4') {
        return `/give @p minecraft:written_book{pages:[${pages.toString()}], title: "${title + suffix}", author: "${author}"}`;
      }
    } else if (minecraftVersion === 'bedrock') {
      // FIXME: This is probably the incorrect format for bedrock
      return `/give @p written_book[written_book_content={title:"${title + suffix}",author:"${author}",pages:[${pages.toString()}]}] 1`;
    }
  } else if (generationFormat === 'text') {
    return pages.toString();
  }

  return '';
}

/**
 * Creates a single page of the book by adding lines up to the `linesPerPage` limit.
 *
 * @param lines The lines of text to add to the page.
 * @param linesPerPage The number of lines allowed per page.
 * @param generationFormat The format for the book generation (either 'commands' or 'text').
 * @returns An array of formatted pages.
 */
function createBook(
  lines: string[],
  linesPerPage: number,
  generationFormat: 'commands' | 'text'
): string[] {
  let counter = 0;
  let workerLine = '';
  const pages: string[] = [];

  lines.forEach((line) => {
    workerLine += line + '\n';
    counter++;

    if (counter === linesPerPage) {
      const escapedText = escapeCharacters(workerLine, generationFormat);
      const page = encapsulateText(escapedText, generationFormat);

      // Reset for the next page
      workerLine = '';
      counter = 0;

      pages.push(page);
    }
  });

  // Handle any remaining lines
  if (workerLine.length > 0) {
    const escapedText = escapeCharacters(workerLine, generationFormat);
    const page = encapsulateText(escapedText, generationFormat);
    pages.push(page);
  }

  return pages;
}

/**
 * Calculates the line limit based on the Minecraft version and format (commands or text).
 *
 * @param linesPerPage The number of lines allowed per page.
 * @param generationFormat The format for the book generation (either 'commands' or 'text').
 * @param minecraftVersion The Minecraft version ('java' or 'bedrock').
 * @returns The calculated line limit.
 */
function calculateLineLimit(
  linesPerPage: number,
  generationFormat: 'commands' | 'text',
  minecraftVersion: 'java' | 'bedrock'
): number {
  if (generationFormat === 'commands') {
    return minecraftVersion === 'bedrock' ? linesPerPage * 50 : linesPerPage * 100;
  } else if (generationFormat === 'text') {
    return linesPerPage;
  }
  return 0;
}

/**
 * Generates the book content and splits it into pages based on the parameters.
 *
 * @param params The parameters for generating the book.
 * @returns The final book and any removed characters.
 */
function createBookGenerator({
  generationFormat,
  minecraftVersion,
  title,
  author,
  linesPerPage = 14,
  nameSuffix = '',
  javaVersion = '1.20.4',
  text,
}: BookParameters) {
  const lexicon = createCharacterLexicon();
  const stringWrapper = createStringWrapper(lexicon);
  const lines = stringWrapper.getSplitString(text);

  let book: string[] = [];
  let pages: string[] = [];
  let booksCounter = 0;

  const lineLimit = calculateLineLimit(linesPerPage, generationFormat, minecraftVersion);

  let startIndex = 0;

  while (startIndex < lines.length) {
    const endIndex = Math.min(startIndex + lineLimit, lines.length);
    const splicedLines = lines.slice(startIndex, endIndex);

    const pageContent = createBook(splicedLines, linesPerPage, generationFormat);
    pages = [...pages, ...pageContent];

    startIndex = endIndex;
    booksCounter++;
  }

  book = [
    finalizeBook(
      pages,
      title,
      author,
      nameSuffix,
      generationFormat,
      minecraftVersion,
      javaVersion,
      booksCounter
    ),
  ];

  return {
    book: book,
    removedCharacters: [...new Set(stringWrapper.removedCharacters)],
  };
}

export default createBookGenerator;
