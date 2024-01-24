/**
 * Creates a command from an array of lines
 * @param book An array of lines
 * @param author The author of the book
 * @param title The prefix title of the book (the book number will be added to the end, for example: Book [1])
 * @returns The command
 */
function createCommand(book: string[], author: string, title: string): string {
  // Create an array of page JSON strings, containing 14 lines each
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

      // If the index is divisible by 14, return the page string
      if (counter == 14) {
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
 * @param appendIndex Weather to add an index after book names
 * @param appendIndexFormat The format of the appended index, replaces 'n' with the index
 * @returns A command generating a minecraft book that contain the lines contents
 */
export default function returnCommands(
  lines: string[],
  author: string,
  title: string,
  appendIndex: boolean,
  appendIndexFormat: string
) {
  const commands: string[] = [];

  // Create copy to not modify the original
  const copy_of_lines = [...lines];

  // Counter for the amount of lines
  let amount_of_lines = 0;

  // Counter for amount of books
  let amount_of_books = 0;

  // Go through each line
  for (let i = 0; i <= lines.length; i++) {
    amount_of_lines++;

    // If the amount of lines is 1400, or the index is the length of the lines array, create the command
    if (amount_of_lines == 1400 || i == lines.length) {
      // Create object containing info
      const params = {
        lines: copy_of_lines.splice(0, amount_of_lines),
        author: author,
        title: `${title}${appendIndex ? appendIndexFormat.replace('n', amount_of_books.toString()) : ''}`,
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
