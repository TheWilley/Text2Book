/**
 * Creates text from an array of lines
 * @param book An array of lines
 * @returns The text
 */
function createText(book: string[]): string {
    // Create an array of page JSON strings, containing 14 lines each
    let lines = '';
    let counter = 0;

    const pageStrings = book.map((line) => {
        // Add the line to the lines string
        lines += line;

        // Increase counter
        counter++;

        // If the index is divisible by 14, return the page string
        if (counter == 14) {
            // Create text string
            lines = lines.trim();
            const pageString = lines;

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
        lines = lines.trim();
        const pageString = lines;
        pageStrings.push(pageString);
    }

    return pageStrings.toString();
}

/**
 * Generates text which can be copied into minecraft books page by page and returns it
 * @param lines The lines to convert
 * @returns A text string contain the lines contents
 */
export default function returnText(lines: string[]) {
    const texts: string[] = [];

    // Create copy to not modify the original
    const copy_of_lines = [...lines];

    // Counter for the amount of lines
    let amount_of_lines = 0;

    // Go through each line
    for (let i = 0; i <= lines.length; i++) {
        amount_of_lines++;

        // If the amount of lines is 14, or the index is the length of the lines array, create the text string
        if (amount_of_lines == 14 || i == lines.length) {
            // Create object containing info
            const params = {
                lines: copy_of_lines.splice(0, amount_of_lines),
            };

            // Create the command
            const text = createText(params.lines);

            // Reset the amount of lines
            amount_of_lines = 0;

            // Push the command to the array
            texts.push(text);
        }
    }

    return texts;
}