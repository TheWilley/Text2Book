import { IBookParameters, MinecraftCharacter } from '../global/types';
import glyphs from '../data/glyphs.json';
import createStringWrapper from './createStringWrapper';

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
}: IBookParameters) {
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
