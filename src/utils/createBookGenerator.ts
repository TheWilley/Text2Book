import {
  CommandTarget,
  GenerationFormat,
  IBookParameters,
  JavaVersion,
  MinecraftCharacter,
  MinecraftVersion,
} from '../global/types';
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
  generationFormat: GenerationFormat,
  javaVersion: JavaVersion
): string {
  switch (generationFormat) {
    case 'commands': {
      const escapedTrimmedText = inputText
        .replace(/"/g, '\\\\' + '"') // Escape double quotes (")
        .replace(/'/g, '\\' + "'") // Escape single quotes (')
        .trim(); // Remove whitespace from both ends of the string ( )

      if (javaVersion === '1.20.4' || javaVersion === '1.20.5') {
        return escapedTrimmedText.replace(/\n/g, '\\\\n'); // Escape newlines (\n)
      } else {
        return escapedTrimmedText.replace(/\n/g, '\\n'); // Escape newlines (\n)
      }
    }
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
  generationFormat: GenerationFormat,
  JavaVersion: JavaVersion
): string {
  switch (generationFormat) {
    case 'commands':
      if (JavaVersion === '1.20.5' || JavaVersion === '1.21.5') {
        return `"${inputText}"`;
      } else {
        return `'{"text":"${inputText}"}'`;
      }
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
  generationFormat: GenerationFormat,
  minecraftVersion: MinecraftVersion,
  javaVersion: JavaVersion,
  booksCounter: number
) {
  const suffix = nameSuffix.replace('[n]', booksCounter.toString()); // Use counter for book name suffix
  const titleWithSuffix = title + suffix;
  const stringifiedPages = pages.toString();

  if (generationFormat === 'commands') {
    if (minecraftVersion === 'java') {
      if (javaVersion === '1.20.5' || javaVersion === '1.21.5') {
        return `/give @p written_book[written_book_content={title:"${titleWithSuffix}",author:"${author}",pages:[${stringifiedPages}]}] 1`;
      } else if (javaVersion === '1.20.4') {
        return `/give @p minecraft:written_book{title: "${titleWithSuffix}", author: "${author}", pages:[${stringifiedPages}]}`;
      }
    } else if (minecraftVersion === 'bedrock') {
      // FIXME: This is the incorrect format for bedrock (#21)
      return `/give @p written_book[written_book_content={title:"${titleWithSuffix}",author:"${author}",pages:[${stringifiedPages}]}] 1`;
    }
  } else if (generationFormat === 'text') {
    return pages.toString();
  }

  return '';
}

/**
 * Creates a single book from the provided lines of text, splitting it into pages.
 * Each page will contain up to the specified number of lines and will be formatted
 * according to the specified generation format.
 *
 * @param lines - The lines of text to include in the book.
 * @param linesPerPage - The number of lines allowed per page in the book.
 * @param title - The title of the book.
 * @param author - The author of the book.
 * @param nameSuffix - A suffix to be added to the book's name.
 * @param generationFormat - The format for generating the book ('commands' or 'text').
 * @param minecraftVersion - The version of Minecraft the book is for ('java' or 'bedrock').
 * @param javaVersion - The version of Java to target for Java Minecraft editions.
 * @param booksCounter - A counter to track how many books have been generated.
 *
 * @returns The finalized book command or formatted text, depending on the generation format.
 */
function createBook(
  lines: string[],
  linesPerPage: number,
  title: string,
  author: string,
  nameSuffix: string,
  generationFormat: GenerationFormat,
  minecraftVersion: MinecraftVersion,
  javaVersion: JavaVersion,
  booksCounter: number
) {
  let counter = 0;
  let workerLine = '';
  const pages: string[] = [];

  lines.forEach((line) => {
    workerLine += line + '\n';
    counter++;

    if (counter === linesPerPage) {
      const escapedText = escapeCharacters(workerLine, generationFormat, javaVersion);
      const page = encapsulateText(escapedText, generationFormat, javaVersion);

      // Reset for the next page
      workerLine = '';
      counter = 0;

      pages.push(page);
    }
  });

  // Handle any remaining lines
  if (workerLine.length > 0) {
    const escapedText = escapeCharacters(workerLine, generationFormat, javaVersion);
    const page = encapsulateText(escapedText, generationFormat, javaVersion);
    pages.push(page);
  }

  return finalizeBook(
    pages,
    title,
    author,
    nameSuffix,
    generationFormat,
    minecraftVersion,
    javaVersion,
    booksCounter
  );
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
  generationFormat: GenerationFormat,
  minecraftVersion: MinecraftVersion
): number {
  if (generationFormat === 'commands') {
    return minecraftVersion === 'bedrock' ? linesPerPage * 50 : linesPerPage * 100;
  } else if (generationFormat === 'text') {
    return linesPerPage;
  }
  return 0;
}

/**
 * Gets the character limit based on the command target.
 * @param target The target who will execute the command.
 * @returns The character limit.
 */
function getCharacterLimitFromCommandTarget(target: CommandTarget) {
  if (target === 'player') {
    return 256;
  } else if (target === 'commandblock') {
    return 32500;
  } else {
    return 0;
  }
}

/**
 * Generates a series of books based on the provided parameters. The input text
 * is split into pages, formatted according to the specified generation format,
 * and returned as a series of books.
 *
 * @param params - The parameters for generating the books.
 * @param params.generationFormat - The format for generating the book ('commands' or 'text').
 * @param params.minecraftVersion - The version of Minecraft the book is for ('java' or 'bedrock').
 * @param params.title - The title of the book.
 * @param params.author - The author of the book.
 * @param [params.linesPerPage=14] - The number of lines allowed per page in the book.
 * @param [params.nameSuffix=''] - A suffix to be added to the book's name.
 * @param [params.javaVersion='1.20.4'] - The version of Java to target for Java Minecraft editions.
 * @param params.text - The text content to be split into books and pages.
 *
 * @returns The generated book data and the unsupported characters.
 */
function createBookGenerator({
  generationFormat,
  minecraftVersion,
  title,
  author,
  linesPerPage = 14,
  nameSuffix = '',
  javaVersion,
  text,
  commandTarget,
}: IBookParameters) {
  // Preparations
  const lineLimit = calculateLineLimit(linesPerPage, generationFormat, minecraftVersion);
  const lexicon = createCharacterLexicon();
  const stringWrapper = createStringWrapper(lexicon);
  const lines = stringWrapper.getSplitString(text);

  // Variables for the next couple of lines
  const library = [];
  let booksCounter = 0;
  let startIndex = 0;
  let indexOffset = 0;

  while (startIndex < lines.length) {
    const endIndex = Math.min(startIndex + lineLimit - indexOffset, lines.length);
    const splicedLines = lines.slice(startIndex, endIndex);

    const book = createBook(
      splicedLines,
      linesPerPage,
      title,
      author,
      nameSuffix,
      generationFormat,
      minecraftVersion,
      javaVersion,
      booksCounter
    );

    // We check actively reduce the number of lines
    // by increasing the offset until we are below the limit
    if (book.length > getCharacterLimitFromCommandTarget(commandTarget)) {
      indexOffset++;
      continue;
    }

    // Only when the command is short enough do we add it
    library.push(book);

    // Continue the loop
    startIndex = endIndex;
    indexOffset = 0;
    booksCounter++;
  }

  return {
    book: library,
    unsupportedCharacters: [...new Set(stringWrapper.unsupportedCharacters)],
  };
}

export default createBookGenerator;
