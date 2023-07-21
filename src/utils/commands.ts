import getChars from './chars';
type LineType = { 'word': string, 'value': number }[]

// Processing order:
// getLines => calculateLetters => getCommands => createCommand

/**
 * Initiates the convertion process
 */
export default function start(text: string, author: string, title: string) {
    // Step 1 - Get all lines
    const lines = getLines(text);

    // Step 2 - Pass lines along with author and title to generate commands
    const commands = getCommands(lines, author, title);

    // Step 3 - Return commands
    return commands;
}

/**
 * Calculates the amount of dots in a word
 * @param word The word to calculate the letters of
 * @returns The lines and the sum of the dots
 */
function calculateLetters(word: string): LineType {
    const lines: LineType = [], allChars = getChars(), ms = 114;
    let sum = 0, substringed_word = '';

    // Go trough each letter
    for (let i = 0; i < word.length; i++) {
        // Get the character
        const mcChar = allChars.find((c) => c.letter == word.charAt(i));

        // If the character is not found, remove it and break the loop
        if (!mcChar) {
            word = word.substring(0, i) + word.substring(i + 1);
            break;
        }

        // Add the dots
        sum += mcChar.dots;

        // Set the substringed word
        substringed_word = word.substring(0, i);

        // Check if the sum is bigger than the max sum
        if (sum >= ms) {
            // Set the substringed word to include the last letter
            substringed_word = word.substring(0, i - 1);

            // Add the word to the array
            lines.push({ 'word': substringed_word, 'value': sum });

            // Remove the word from the string including the last letter
            word = word.substring(i - 1);

            // Reset the index and sum
            i = sum = 0;
        }
    }

    // Add the last word
    lines.push({ 'word': word, 'value': sum });

    // Return the lines, the rest of the word and the sum + the length of the rest of the word + 4 to account for the spaces
    return lines;
}

/**
 * Calculates the lines of the text
 * @returns The lines as a string array
 */
function getLines(text: string) {
    let words: string[] = [], rows: string[] = [], lines: LineType = [], sum = 0;
    const new_rows = [];

    // This is to fix some errors regarding formatting
    // The (') and (") characters break syntax in command blocks, causing all sort of oddities
    text = text.replace(/"/g, '‟').replace(/'/g, '‛');

    // Split the string into words
    words = text.split(/\s+/);

    // Go trough each word
    for (let i = 0; i < words.length; i++) {
        // Get the letters
        lines = calculateLetters(words[i]);

        for (let e = 0; e < lines.length; e++) {
            // Add the sum of the letters and the spaces
            sum += lines[e].value + 3;

            // If the sum is bigger than 114, reset the sum to the word which wrapped
            if (sum >= 114 || i == words.length - 1) {
                sum = lines[e].value;

                new_rows.push(rows.join(' '));
                rows = [];
            }

            // Add the letters to the rows
            rows.push(lines[e].word);
        }
    }

    // Add the rest of the words to the rows
    new_rows.push(rows.join(' '));

    // Return the rows and remove empty rows
    return new_rows.filter((r) => r != '');
}

/**
 * Generates a minecraft book with the lines contents and returns it
 * @param lines The lines to convert
 * @param author The author of the generated book
 * @param title The title of the generated book
 * @returns A command generating a minecraft book containg the lines contents
 */
function getCommands(lines: string[], author: string, title: string) {
    // TODO: Can probably find a better type here
    const commands: string[] = [];

    // Create copy to not modify the original
    const copy_of_lines = [...lines];

    // Counter for the amount of lines
    let amount_of_lines = 0;

    // Counter for amount of books
    let amount_of_books = 0;

    // Go trough each line
    for (let i = 0; i <= lines.length; i++) {
        amount_of_lines++;

        // If the amount of lines is 1400, or the index is the length of the lines array, create the command
        if (amount_of_lines == 1400 || i == lines.length) {
            // Create object containing info
            const params = {
                lines: copy_of_lines.splice(0, amount_of_lines),
                author: author == '' ? 'Author' : author,
                title: `${title == '' ? 'Book' : title} [${amount_of_books}]`
            };

            console.log(lines);

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


/**
 * Creates a command from a array of lines
 * @param book An array of lines
 * @param author The author of the book
 * @param title The prefix title of the book (the book number will be added to the end, for example: Book [1])
 * @returns The command
 */
function createCommand(book: string[], author: string, title: string): string {
    // Create an array of page JSON strings, containing 14 lines each
    let lines = '';
    let counter = 1;

    const pageStrings = book.map((line) => {
        // Add the line to the lines string
        lines += line + ' ';

        // Increase coonter
        counter++;
        
        // If the index is divisible by 14, return the page string
        if (counter == 14) {
            // Create text string
            const pageString = `'{"text":"${lines}"}'`;

            // Reset lines and counter
            lines = '';
            counter = 0;

            // Finally return the string
            return pageString;
        } else {
            return null;
        }

    }).filter(pageString => pageString !== null);

    // Add the remaining lines to the page strings
    if (lines.length > 0) {
        const pageString = `'{"text":"${lines}"}'`;
        pageStrings.push(pageString);
    }

    // Create the book item with the page strings as a tag
    const bookItem = {
        id: 'minecraft:written_book',
        author: author,
        title: title,
        pages: pageStrings
    };

    // Convert the book item to a command string
    const command = `/give @p ${bookItem.id}{pages:[${bookItem.pages}], title: "${bookItem.title}", author: "${bookItem.author}"}`;

    // Return the command string
    return command;
}

/**
 * Gets the stats of the text, such as the amount of characters, lines, pages and books
 * Removed for now but may be added llater
 * @returns The stats of the text
 */
// function getStats() {
//     this._lines = new Lines(this._GLOBALS.text_content.value).getLines();
//     const amountOfCharacters = this._GLOBALS.text_content.value.length;
//     const amountOfLines = this._lines.length;
//     const amountOfPages = Math.ceil(this._lines.length / 14);
//     const amountOfBooks = Math.ceil(amountOfPages / 100);

//     return [this._lines, amountOfCharacters, amountOfLines, amountOfPages, amountOfBooks];
// }