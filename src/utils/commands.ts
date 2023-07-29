import getChars from './chars';
type DotsOfWordType = { 'word': string, 'value': number }[]

// Processing order:
// getLines => calculateLetters => getCommands / getRawText => createCommand

/**
 * Initiates the convertion process
 */
export default function start(text: string, author: string, title: string, rawOutput: boolean) {
    // Step 1 - Get all lines
    const lines = getLines(text);

    if (rawOutput) {
        // Step (2) - Pass lines to generate text
        const texts = getRawText(lines);

        // Step (3) - Return texts
        return texts;
    } else {
        // Step (2) - Pass lines along with author and title to generate commands
        const commands = getCommands(lines, author, title);

        // Step (3) - Return commands
        return commands;
    }
}

/**
 * Calculates the amount of dots in a word
 * @param word The word to calculate the letters of
 * @returns The lines and the sum of the dots
 */
function getDotsOfWord(word: string): DotsOfWordType {
    const words: DotsOfWordType = [], allChars = getChars(), ms = 114;
    let total_dots = 0, substringed_word = '';

    // Go trough each letter
    for (let i = 0; i < word.length; i++) {
        // Get the character
        const mcChar = allChars.find((character) => character.letter == word.charAt(i));

        // If the character is not found, remove it and break the loop
        if (!mcChar) {
            continue;
        }
        
        // Add the dots
        total_dots += mcChar.dots;
        
        // Set the substringed word
        substringed_word = word.substring(0, i + 1);

        // Check if the sum is bigger than the max sum
        if (total_dots >= ms) {
            // Set the substringed word to include the last letter
            substringed_word = word.substring(0, i + 1);

            // Add the word to the array
            words.push({ 'word': substringed_word, 'value': total_dots });

            // Remove the word from the string including the last letter
            word = word.substring(i - 1);

            // Reset the index and sum
            total_dots = i = 0; 
        }
    }

    // Add the last word
    words.push({ 'word': word, 'value': total_dots });

    // Return the words
    return words;
}

/**
 * Calculates the lines of the text
 * @returns The lines as a string array
 */
function getLines(text: string) {
    let spliced_words: string[] = [], lines: string[] = [], words: DotsOfWordType = [], sum = 0;
    const new_lines = [];

    // This is to fix some errors regarding formatting
    // The (') and (") characters break syntax in command blocks, causing all sort of oddities
    text = text.replace(/"/g, '‟').replace(/'/g, '‛').replace(/\n/g, ' ');

    // Split the text into words
    spliced_words = text.split(/(\s+)/);

    // Go trough each word
    for (let i = 0; i < spliced_words.length; i++) {
        // Get the words and the sum of the it's letters
        words = getDotsOfWord(spliced_words[i]);

        // Go trough each word
        for (let e = 0; e < words.length; e++) {
            // Add the sum of the letters and the spaces
            sum += words[e].value;

            // If the sum is bigger than 114, reset the sum to the word which caused the overflow
            // The reason we ignore the space is becuase it will not occupy a space if its the very last word in the row
            if (words[e].word != ' ' && sum > 114) {
                sum = words[e].value;

                new_lines.push(lines.join(''));
                lines = [];
            }

            // Add the letters to the lines
            lines.push(words[e].word);
        }

    }

    // Add the rest of the words to the lines
    new_lines.push(lines.join(''));

    // Return the lines and remove empty lines
    return new_lines.filter((r) => r != '');
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
    let counter = 0;

    const pageStrings = book.map((line) => {
        // Add the line to the lines string
        lines += line;

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
 * Generates text which can be copied into minecraft books page by page and returns it
 * @param lines The lines to convert
 * @returns A text string containg the lines contents
 */
function getRawText(lines: string[]) {
    // TODO: Can probably find a better type here
    const texts: string[] = [];

    // Create copy to not modify the original
    const copy_of_lines = [...lines];

    // Counter for the amount of lines
    let amount_of_lines = 0;

    // Go trough each line
    for (let i = 0; i <= lines.length; i++) {
        amount_of_lines++;

        // If the amount of lines is 14, or the index is the length of the lines array, create the text string
        if (amount_of_lines == 14 || i == lines.length) {
            // Create object containing info
            const params = {
                lines: copy_of_lines.splice(0, amount_of_lines),
            };

            // Create the command
            const text = params.lines.join('');

            // Reset the amount of lines
            amount_of_lines = 0;

            // Push the command to the array
            texts.push(text);
        }
    }

    return texts;
}