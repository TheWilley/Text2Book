import {
  CommandTarget,
  GenerationFormat,
  BookParameters,
  JavaVersion,
  MinecraftVersion,
} from '../global/types';
import glyphs from '../data/glyphs.json';
import filterCharacters from './filterCharacters';
import { getLines } from './stringWrapper';

/**
 * Escapes special characters in the text based on the format.
 *
 * @param inputText The text to escape.
 * @param generationFormat The format for the book generation.
 * @returns The escaped text.
 */
function escapeCharacters(
  inputText: string,
  generationFormat: GenerationFormat,
  javaVersion: JavaVersion
): string {
  if (generationFormat === 'text') {
    return inputText.trim(); // For 'text' format, just trim
  }

  const escapedText = inputText
    .replace(/"/g, '\\\\"') // Escape double quotes (")
    .replace(/'/g, "\\'") // Escape single quotes (')
    .trim(); // Trim whitespace

  // Handle newlines differently based on Java version
  const newlineEscape = javaVersion === '1.21.5+' ? '\\n' : '\\\\n';

  return escapedText.replace(/\n/g, newlineEscape);
}

/**
 * Encapsulates the text with additional formatting based on the generation format and Java version.
 *
 * @param inputText The text to encapsulate.
 * @param generationFormat The format for the book generation.
 * @param javaVersion The Java version to target.
 * @returns The formatted text.
 */
function encapsulateText(
  inputText: string,
  generationFormat: GenerationFormat,
  javaVersion: JavaVersion
) {
  // Handle non-command format
  if (generationFormat === 'text') return inputText;

  const versionMap = {
    '1.13+': `"{\\"text\\":\\"${inputText}\\"}"`,
    '1.14+': `'["${inputText}"]'`,
    '1.20.5+': `'["${inputText}"]'`,
    '1.21.5+': `"${inputText}"`,
  };

  return versionMap[javaVersion] || '';
}

function getTitleWithSuffix(
  title: string,
  nameSuffix: string,
  booksCounter: number
): string {
  const suffix = nameSuffix.replace('[n]', booksCounter.toString());
  return title + suffix;
}

/**
 * Generates the proper command or text format based on the selected options.
 *
 * @param pages The pages of the book.
 * @param title The title of the book.
 * @param author The author of the book.
 * @param nameSuffix The suffix for the book name.
 * @param generationFormat The format for the book generation.
 * @param minecraftVersion The Minecraft version.
 * @param javaVersion The Java version.
 * @param booksCounter The counter for generating multiple books.
 * @returns The final formatted book content.
 */
function getCommand(
  pages: string[],
  title: string,
  author: string,
  nameSuffix: string,
  generationFormat: GenerationFormat,
  minecraftVersion: MinecraftVersion,
  javaVersion: JavaVersion,
  booksCounter: number
): string {
  const titleWithSuffix = getTitleWithSuffix(title, nameSuffix, booksCounter);

  const pagesString = pages.join(',');

  // Handle the simplest format first
  if (generationFormat === 'text') {
    return pages.join('\n');
  }

  // If it's not commands, we're done
  if (generationFormat !== 'commands') {
    return '';
  }

  // Handle Bedrock
  if (minecraftVersion === 'bedrock') {
    return `/give @p written_book[minecraft:written_book_content={pages:[${pagesString}],title:"${titleWithSuffix}",author:"${author}"}]`;
  }

  // For now I've named them legacy and mordern, but they should be renamed to account for other versions
  const legacySyntax = `/give @p written_book{pages:[${pagesString}],title:"${titleWithSuffix}",author:"${author}"}`;
  const modernSyntax = `/give @p written_book[minecraft:written_book_content={pages:[${pagesString}],title:"${titleWithSuffix}",author:"${author}"}]`;

  const versionMap = {
    '1.13+': legacySyntax,
    '1.14+': legacySyntax,
    '1.20.5+': modernSyntax,
    '1.21.5+': modernSyntax,
  };

  return versionMap[javaVersion] || '';
}

/**
 * Splits the input lines into pages based on the specified lines per page and formats them according to the generation format and Java version.
 *
 * @param lines The lines of text to split into pages.
 * @param linesPerPage The number of lines allowed per page in the book.
 * @param generationFormat The format for the book generation.
 * @param javaVersion The Java version to target.
 * @returns An array of formatted pages.
 */
function getPages(
  lines: string[],
  linesPerPage: number,
  generationFormat: GenerationFormat,
  javaVersion: JavaVersion
) {
  const pages = [];

  for (let i = 0; i < lines.length; i += linesPerPage) {
    const workerLine = lines.slice(i, i + linesPerPage).join('\n') + '\n';

    const escapedText = escapeCharacters(workerLine, generationFormat, javaVersion);
    const page = encapsulateText(escapedText, generationFormat, javaVersion);

    pages.push(page);
  }

  return pages;
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
  const pages = getPages(lines, linesPerPage, generationFormat, javaVersion);
  const command = getCommand(
    pages,
    title,
    author,
    nameSuffix,
    generationFormat,
    minecraftVersion,
    javaVersion,
    booksCounter
  );

  return command;
}

/**
 * Calculates the line limit based on the Minecraft version and format (commands or text).
 *
 * @param linesPerPage The number of lines allowed per page.
 * @param generationFormat The format for the book generation.
 * @param minecraftVersion The Minecraft version ('java' or 'bedrock').
 * @returns The calculated line limit.
 */
function calculateLineLimit(
  linesPerPage: number,
  generationFormat: GenerationFormat,
  minecraftVersion: MinecraftVersion
): number {
  switch (generationFormat) {
    case 'commands':
      return minecraftVersion === 'bedrock' ? linesPerPage * 50 : linesPerPage * 100;
    case 'text':
      return linesPerPage;
    default:
      return 0;
  }
}

/**
 * Gets the character limit based on the command target.
 * @param target The target who will execute the command.
 * @returns The character limit.
 */
function getCharacterLimitFromCommandTarget(target: CommandTarget) {
  switch (target) {
    case 'player':
      return 256;
    case 'commandblock':
      return 32500;
    default:
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
function generateBooks({
  generationFormat,
  minecraftVersion,
  title,
  author,
  linesPerPage = 14,
  nameSuffix = '',
  javaVersion,
  text,
  commandTarget,
}: BookParameters) {
  // Preparations
  const lineLimit = calculateLineLimit(linesPerPage, generationFormat, minecraftVersion);
  const [unsupportedCharacters, filteredText] = filterCharacters(
    glyphs.map((char) => char.char),
    text
  );
  const lines = getLines(filteredText);

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
    unsupportedCharacters,
  };
}

export default generateBooks;
