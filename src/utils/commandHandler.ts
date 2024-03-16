/**
 * Creates a command from an array of lines
 * @param book An array of lines
 * @param author The author of the book
 * @param title The prefix title of the book (the book number will be added to the end, for example: Book [1])
 * @returns The command
 */
function createCommand(book: string[], author: string, title: string): string {
  let lines = '';
  let counter = 0;

  const escapeCharacters = () => {
    return lines
      .replace(/"/g, '\\\\' + '"') // Escape double quotes (")
      .replace(/'/g, '\\' + "'") // Escape single quotes (')
      .trim() // Remove whitespace from both ends of the string ( )
      .replace(/\n/g, '\\\\n'); // Escape new lines (\n)
  };

  const pageStrings = book
    .map((line) => {
      // Add the line to the lines string
      lines += line;

      // Increase counter
      counter++;

      // If the index is divisible by 13, return the page string
      // This is supposed to be 14, but until the word cutoff issue is fixed, it's 13 as it adds a fallback line
      // See https://github.com/TheWilley/Text2Book/issues/13
      if (counter == 13) {
        // Create text string
        lines = escapeCharacters();
        const pageString = `'{"text":"${lines}"}'`;

        // Reset lines and counter
        lines = '';
        counter = 0;

        // Finally return the string
        return pageString;
      } else {
        return null;
      }
    })
    .filter((pageString) => pageString !== null);

  // Add the remaining lines to the page strings
  if (lines.length > 0) {
    lines = escapeCharacters();
    const pageString = `'{"text":"${lines}"}'`;
    pageStrings.push(pageString);
  }

  // Create the book item with the page strings as a tag
  const bookItem = {
    id: 'minecraft:written_book',
    author: author,
    title: title,
    pages: pageStrings,
  };

  // Convert the book item to a command string
  return `/give @p ${bookItem.id}{pages:[${bookItem.pages.toString()}], title: "${bookItem.title}", author: "${bookItem.author}"}`;
}

/**
 * Generates a minecraft book with the lines contents and returns it
 * @param lines The lines to convert
 * @param author The author of the generated book
 * @param title The title of the generated book
 * @param minecraftVersion The version of minecraft to generate the book for
 * @param appendIndexFormat The format of the appended index, replaces 'n' with the index
 * @returns A command generating a minecraft book that contain the lines contents
 */
export default function returnCommands(
  lines: string[],
  author: string,
  title: string,
  minecraftVersion: 'bedrock' | 'java',
  appendIndexFormat: string
) {
  const commands: string[] = [];
  const copy_of_lines = [...lines];
  let amount_of_lines = 0;
  let amount_of_books = 0;

  // 13 lines * 50 characters per line = 650 characters
  // 13 lines * 100 characters per line = 1300 characters
  const line_limit = minecraftVersion === 'bedrock' ? 650 : 1300;

  // Go through each line
  for (let i = 0; i <= lines.length; i++) {
    amount_of_lines++;

    if (amount_of_lines == line_limit || i == lines.length) {
      // Create object containing info
      const params = {
        lines: copy_of_lines.splice(0, amount_of_lines),
        author: author,
        title: (() => {
          const baseTitle = title;
          const indexSuffix = appendIndexFormat
            ? appendIndexFormat.replace('n', amount_of_books.toString())
            : '';
          return `${baseTitle}${indexSuffix}`;
        })(),
      };

      // Create the command
      const command = createCommand(params.lines, params.author, params.title);

      // Reset the amount of lines
      amount_of_lines = 0;

      // Increase amount of books
      amount_of_books++;

      // Push the command to the array
      commands.push(command);
    }
  }

  return commands;
}
