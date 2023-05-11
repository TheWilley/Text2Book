// @ts-ignore
import copy_icon from "./content/copy-icon.png";

/**
 * @param {string} letter
 * @param {number} dots
 * 
 * Class representing a Minecraft character
 * 
 * The length of the letter is represented by "dots"
 */
class MinecraftChar {
    private _char: string;
    private _dots: number;

    constructor(char: string, dots: number) {
        this._char = char;
        this._dots = dots;
    }

    set letter(letter: string) {
        this._char = letter;
    }

    set dots(dots: number) {
        this._dots = dots;
    }

    get letter() {
        return this._char;
    }

    get dots() {
        return this._dots;
    }
}

/**
 * Class representing a Minecraft book
 * @param {string} text
 */
class Lines {
    private _text: string;
    private _allChars: MinecraftChar[] = [
        new MinecraftChar("À", 6),
        new MinecraftChar("Á", 6),
        new MinecraftChar("Â", 6),
        new MinecraftChar("È", 6),
        new MinecraftChar("Ê", 6),
        new MinecraftChar("Ë", 6),
        new MinecraftChar("Í", 4),
        new MinecraftChar("Ó", 6),
        new MinecraftChar("Ô", 6),
        new MinecraftChar("Õ", 6),
        new MinecraftChar("Ú", 6),
        new MinecraftChar("ß", 6),
        new MinecraftChar("ã", 6),
        new MinecraftChar("õ", 6),
        new MinecraftChar("ğ", 6),
        new MinecraftChar("İ", 4),
        new MinecraftChar("ı", 4),
        new MinecraftChar("Œ", 6),
        new MinecraftChar("œ", 7),
        new MinecraftChar("Ş", 6),
        new MinecraftChar("ş", 6),
        new MinecraftChar("Ŵ", 6),
        new MinecraftChar("ŵ", 6),
        new MinecraftChar("ž", 6),
        new MinecraftChar("ȇ", 6),
        new MinecraftChar("!", 2),
        new MinecraftChar("\"", 5),
        new MinecraftChar("#", 6),
        new MinecraftChar("$", 6),
        new MinecraftChar("%", 6),
        new MinecraftChar("&", 6),
        new MinecraftChar("'", 3),
        new MinecraftChar("(", 5),
        new MinecraftChar(")", 5),
        new MinecraftChar("*", 5),
        new MinecraftChar("+", 6),
        new MinecraftChar(",", 2),
        new MinecraftChar("-", 6),
        new MinecraftChar(".", 2),
        new MinecraftChar("/", 6),
        new MinecraftChar("0", 6),
        new MinecraftChar("1", 6),
        new MinecraftChar("2", 6),
        new MinecraftChar("3", 6),
        new MinecraftChar("4", 6),
        new MinecraftChar("5", 6),
        new MinecraftChar("6", 6),
        new MinecraftChar("7", 6),
        new MinecraftChar("8", 6),
        new MinecraftChar("9", 6),
        new MinecraftChar(":", 2),
        new MinecraftChar(";", 2),
        new MinecraftChar("<", 5),
        new MinecraftChar("=", 6),
        new MinecraftChar(">", 5),
        new MinecraftChar("?", 6),
        new MinecraftChar("@", 7),
        new MinecraftChar("A", 6),
        new MinecraftChar("B", 6),
        new MinecraftChar("C", 6),
        new MinecraftChar("D", 6),
        new MinecraftChar("E", 6),
        new MinecraftChar("F", 6),
        new MinecraftChar("G", 6),
        new MinecraftChar("H", 6),
        new MinecraftChar("I", 4),
        new MinecraftChar("J", 6),
        new MinecraftChar("K", 6),
        new MinecraftChar("L", 6),
        new MinecraftChar("M", 6),
        new MinecraftChar("N", 6),
        new MinecraftChar("O", 6),
        new MinecraftChar("P", 6),
        new MinecraftChar("Q", 6),
        new MinecraftChar("R", 6),
        new MinecraftChar("S", 6),
        new MinecraftChar("T", 6),
        new MinecraftChar("U", 6),
        new MinecraftChar("V", 6),
        new MinecraftChar("W", 6),
        new MinecraftChar("X", 6),
        new MinecraftChar("Y", 6),
        new MinecraftChar("Z", 6),
        new MinecraftChar("[", 4),
        new MinecraftChar("]", 4),
        new MinecraftChar("^", 6),
        new MinecraftChar("_", 6),
        new MinecraftChar("`", 3),
        new MinecraftChar("a", 6),
        new MinecraftChar("b", 6),
        new MinecraftChar("c", 6),
        new MinecraftChar("d", 6),
        new MinecraftChar("e", 6),
        new MinecraftChar("f", 5),
        new MinecraftChar("g", 6),
        new MinecraftChar("h", 6),
        new MinecraftChar("i", 2),
        new MinecraftChar("j", 6),
        new MinecraftChar("k", 5),
        new MinecraftChar("l", 3),
        new MinecraftChar("m", 6),
        new MinecraftChar("n", 6),
        new MinecraftChar("o", 6),
        new MinecraftChar("p", 6),
        new MinecraftChar("q", 6),
        new MinecraftChar("r", 6),
        new MinecraftChar("s", 6),
        new MinecraftChar("t", 4),
        new MinecraftChar("u", 6),
        new MinecraftChar("v", 6),
        new MinecraftChar("w", 6),
        new MinecraftChar("x", 6),
        new MinecraftChar("y", 6),
        new MinecraftChar("z", 6),
        new MinecraftChar("{", 5),
        new MinecraftChar("|", 2),
        new MinecraftChar("}", 5),
        new MinecraftChar("~", 7),
        new MinecraftChar("Ç", 6),
        new MinecraftChar("ü", 6),
        new MinecraftChar("é", 6),
        new MinecraftChar("â", 6),
        new MinecraftChar("ä", 6),
        new MinecraftChar("à", 6),
        new MinecraftChar("å", 6),
        new MinecraftChar("ç", 6),
        new MinecraftChar("ê", 6),
        new MinecraftChar("ë", 6),
        new MinecraftChar("è", 6),
        new MinecraftChar("ï", 4),
        new MinecraftChar("î", 6),
        new MinecraftChar("ì", 3),
        new MinecraftChar("Ä", 6),
        new MinecraftChar("Å", 6),
        new MinecraftChar("É", 6),
        new MinecraftChar("æ", 6),
        new MinecraftChar("Æ", 6),
        new MinecraftChar("ô", 6),
        new MinecraftChar("ö", 6),
        new MinecraftChar("ò", 6),
        new MinecraftChar("û", 6),
        new MinecraftChar("ù", 6),
        new MinecraftChar("ÿ", 6),
        new MinecraftChar("Ö", 6),
        new MinecraftChar("Ü", 6),
        new MinecraftChar("ø", 6),
        new MinecraftChar("£", 6),
        new MinecraftChar("Ø", 6),
        new MinecraftChar("×", 4),
        new MinecraftChar("ƒ", 6),
        new MinecraftChar("á", 6),
        new MinecraftChar("í", 3),
        new MinecraftChar("ó", 6),
        new MinecraftChar("ú", 6),
        new MinecraftChar("ñ", 6),
        new MinecraftChar("Ñ", 6),
        new MinecraftChar("ª", 6),
        new MinecraftChar("º", 6),
        new MinecraftChar("¿", 6),
        new MinecraftChar("®", 7),
        new MinecraftChar("¬", 6),
        new MinecraftChar("½", 6),
        new MinecraftChar("¼", 6),
        new MinecraftChar("¡", 2),
        new MinecraftChar("«", 6),
        new MinecraftChar("»", 6),
        new MinecraftChar("░", 8),
        new MinecraftChar("▒", 9),
        new MinecraftChar("▓", 9),
        new MinecraftChar("│", 6),
        new MinecraftChar("┤", 6),
        new MinecraftChar("╡", 6),
        new MinecraftChar("╢", 8),
        new MinecraftChar("╖", 8),
        new MinecraftChar("╕", 6),
        new MinecraftChar("╣", 8),
        new MinecraftChar("║", 8),
        new MinecraftChar("╗", 8),
        new MinecraftChar("╝", 8),
        new MinecraftChar("╜", 8),
        new MinecraftChar("╛", 6),
        new MinecraftChar("┐", 6),
        new MinecraftChar("└", 9),
        new MinecraftChar("┴", 9),
        new MinecraftChar("┬", 9),
        new MinecraftChar("├", 9),
        new MinecraftChar("─", 9),
        new MinecraftChar("┼", 9),
        new MinecraftChar("╞", 9),
        new MinecraftChar("╟", 9),
        new MinecraftChar("╚", 9),
        new MinecraftChar("╔", 9),
        new MinecraftChar("╩", 9),
        new MinecraftChar("╦", 9),
        new MinecraftChar("╠", 9),
        new MinecraftChar("═", 9),
        new MinecraftChar("╬", 9),
        new MinecraftChar("╧", 9),
        new MinecraftChar("╨", 9),
        new MinecraftChar("╤", 9),
        new MinecraftChar("╥", 9),
        new MinecraftChar("╙", 9),
        new MinecraftChar("╘", 9),
        new MinecraftChar("╒", 9),
        new MinecraftChar("╓", 9),
        new MinecraftChar("╫", 9),
        new MinecraftChar("╪", 9),
        new MinecraftChar("┘", 6),
        new MinecraftChar("┌", 9),
        new MinecraftChar("█", 9),
        new MinecraftChar("▄", 9),
        new MinecraftChar("▌", 5),
        new MinecraftChar("▐", 9),
        new MinecraftChar("▀", 9),
        new MinecraftChar("α", 8),
        new MinecraftChar("β", 7),
        new MinecraftChar("Γ", 7),
        new MinecraftChar("π", 8),
        new MinecraftChar("Σ", 7),
        new MinecraftChar("σ", 8),
        new MinecraftChar("μ", 8),
        new MinecraftChar("τ", 8),
        new MinecraftChar("Φ", 7),
        new MinecraftChar("Θ", 8),
        new MinecraftChar("Ω", 8),
        new MinecraftChar("δ", 7),
        new MinecraftChar("∞", 9),
        new MinecraftChar("∅", 9),
        new MinecraftChar("∈", 6),
        new MinecraftChar("∩", 7),
        new MinecraftChar("≡", 7),
        new MinecraftChar("±", 7),
        new MinecraftChar("≥", 7),
        new MinecraftChar("≤", 7),
        new MinecraftChar("⌠", 9),
        new MinecraftChar("⌡", 6),
        new MinecraftChar("÷", 7),
        new MinecraftChar("≈", 8),
        new MinecraftChar("°", 7),
        new MinecraftChar("∙", 6),
        new MinecraftChar("·", 6),
        new MinecraftChar("√", 9),
        new MinecraftChar("ⁿ", 7),
        new MinecraftChar("²", 6),
        new MinecraftChar("■", 7),
        new MinecraftChar(" ", 4),
    ]

    constructor(text: string) {
        this._text = text;
    }

    /**
     * Calculates the amount of dots in a word
     * @param word The word to calculate the letters of
     * @returns The lines and the sum of the dots
     */
    calculateLetters(word: string): LineType {
        let sum: number = 0, lines: LineType = [], substringed_word: string = "";
        const ms: number = 114

        // Go trough each letter
        for (let i = 1; i < word.length; i++) {
            // Get the character
            let mcChar = this._allChars.find((c) => c.letter == word.charAt(i));

            // If the character is not found, remove it and break the loop
            if (!mcChar) {
                word = word.substring(0, i) + word.substring(i + 1);
                break
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
                lines.push({ "word": substringed_word, "value": sum });

                // Remove the word from the string including the last letter
                word = word.substring(i - 1);

                // Reset the index and sum
                i = sum = 0
            }
        }

        // Replace all "'" with "\'" to escape the character
        word = word.replace(/'/g, "\\'");

        // Add the last word
        lines.push({ "word": word, "value": sum });

        // Return the lines, the rest of the word and the sum + the length of the rest of the word + 4 to account for the spaces
        return lines
    }

    /**
     * Calculates the lines of the text
     * @returns The lines as a string array
     */
    getLines() {
        let words: string[] = [], rows: string[] = [], lines: LineType = [], rest: string = "", sum = 0, new_rows = [], text = this._text;
        // Split the string into words
        words = text.split(/\s+/);

        // Go trough each word
        for (let i = 0; i < words.length; i++) {
            // Get the letters
            lines = this.calculateLetters(words[i]);

            for (let e = 0; e < lines.length; e++) {
                // Add the sum of the letters and the spaces
                sum += lines[e].value + 3;

                // If the sum is bigger than 114, reset the sum to the word which wrapped
                if (sum >= 114 || i == words.length - 1) {
                    sum = lines[e].value;
                    new_rows.push(rows.join(" "));
                    rows = [];
                }

                // Add the letters to the rows
                rows.push(lines[e].word);
            }
        }

        // Add the rest of the words to the rows
        new_rows.push(rows.join(" "));

        // Return the rows and remove empty rows
        return new_rows.filter((r) => r != "");
    }
}

/**
 * Class representing the app
 */
class App {
    private _GLOBALS = {
        "text_content": document.querySelector("#text_content") as HTMLInputElement,
        "dots_count": document.querySelector("#dots_count") as HTMLElement,
        "lines_count": document.querySelector("#lines_count") as HTMLElement,
        "pages_count": document.querySelector("#pages_count") as HTMLElement,
        "books_count": document.querySelector("#books_count") as HTMLElement,
        "submit_btn": document.querySelector("#submit_btn") as HTMLInputElement,
        "progress_bar": document.querySelector("#generate_step_1") as HTMLInputElement,
        "generate_step_2": document.querySelector("#generate_step_2") as HTMLInputElement,
        "create_command_progress_bar": document.querySelector("#create_command_progress_bar") as HTMLInputElement,
        "author": document.querySelector("#author") as HTMLInputElement,
        "title": document.querySelector("#title") as HTMLInputElement,
    }
    private _lines: string[] = [];

    constructor() {
        this.createEventListeners();
    }

    /**
     * Gets the stats of the text, such as the amount of characters, lines, pages and books
     * @returns The stats of the text
     */
    getStats() {
        this._lines = new Lines(this._GLOBALS.text_content.value).getLines();
        let amountOfCharacters = this._GLOBALS.text_content.value.length;
        let amountOfLines = this._lines.length;
        let amountOfPages = Math.ceil(this._lines.length / 14);
        let amountOfBooks = Math.ceil(amountOfPages / 100);

        return [this._lines, amountOfCharacters, amountOfLines, amountOfPages, amountOfBooks]
    }

    /**
     * Updates the stats
     */
    updateStats() {
        const stats = this.getStats();
        this._GLOBALS.dots_count.innerHTML = stats[1].toString();
        this._GLOBALS.lines_count.innerHTML = stats[2].toString();
        this._GLOBALS.pages_count.innerHTML = stats[3].toString();
        this._GLOBALS.books_count.innerHTML = stats[4].toString();
    }

    /**
     * Resets the progress bar
     */
    resetProgressBar() {
        // Add the move in animation to the next step
        if (this._GLOBALS.progress_bar.classList.contains("move-in-animation")) {
            // Get the progress bar
            const progressBar = this._GLOBALS.create_command_progress_bar;

            // Modify the progress bar to use an animation
            progressBar.innerText = "Generating...";
            progressBar.classList.remove("bg-success");

            // Remove the move in animation from the next step
            this._GLOBALS.generate_step_2.classList.add("move-out-animation")

        }
    }

    /**
     * Creates the command elements
     */
    async createCommandElements() {
        let create_elements = (output_value: string, button_event_handler: Function) => {
            // Create list item
            let li = document.createElement("li")

            // Create container
            let container = document.createElement("div");
            container.classList.add("input-group", "mb-3", "mt-3");

            // Create input group
            let input_group = document.createElement("div");
            input_group.classList.add("input-group-prepend");

            // Create copy button icon
            let copy_button_icon = document.createElement("img");
            copy_button_icon.setAttribute("src", copy_icon);
            copy_button_icon.setAttribute("class", "generated_command_copy_button_icon");

            // Create command output
            let command_output = document.createElement("input");
            command_output.setAttribute("type", "text");
            command_output.classList.add("form-control");
            command_output.value = output_value;

            // Create copy button
            let copy_button = document.createElement("span");
            copy_button.classList.add("input-group-text", "generated_command_copy_button");
            copy_button.addEventListener("click", () => button_event_handler(command_output))

            // Comnbine elements
            copy_button.appendChild(copy_button_icon);
            input_group.appendChild(copy_button);
            container.appendChild(input_group);
            container.appendChild(command_output);
            li.appendChild(container)

            // Return the command element
            return li;
        }

        // Create copy to not modify the original
        let copy_of_lines = [...this._lines]

        // Counter for the amount of lines
        let amount_of_lines = 0;

        // Counter for amount of books
        let amount_of_books = 0

        // Clear generate_step_2
        this._GLOBALS.generate_step_2.innerHTML = ""

        // Wait 0.5 seconds, this is to make the button alert the user that the command is being generated, even though it is instant
        await new Promise(r => setTimeout(r, 500));

        // Go trough each line
        for (let i = 0; i <= this._lines.length; i++) {
            amount_of_lines++;

            // If the amount of lines is 1400, or the index is the length of the lines array, create the command
            if (amount_of_lines == 1400 || i == this._lines.length) {
                // Create the command
                let command = this.createCommand(copy_of_lines.splice(0, amount_of_lines), this._GLOBALS.author.value == "" ? "Author" : this._GLOBALS.author.value, `${this._GLOBALS.title.value == "" ? "Book" : this._GLOBALS.title.value} [${amount_of_books}]`);

                // Reset the amount of lines
                amount_of_lines = 0;

                // Add the boilerplate to the command element
                this._GLOBALS.generate_step_2.appendChild(create_elements(command, (target: HTMLInputElement) => {
                    // Select the text field
                    target.select();
                    target.setSelectionRange(0, 99999);

                    // Copy the text inside the text field
                    navigator.clipboard.writeText(target.value);
                }))

                amount_of_books++;
            }
        }
    }

    /**
     * Creates the event listeners
     */
    createEventListeners() {
        this.updateStats()

        this._GLOBALS.text_content.addEventListener("keyup", (e) => {
            this.updateStats()
        });

        this._GLOBALS.submit_btn.addEventListener("click", async (e) => {
            this.resetProgressBar();

            // Disable the button from the event listener
            (e.target as HTMLElement).setAttribute("disabled", "true");

            // Add the move in animation to the next step
            this._GLOBALS.progress_bar.classList.add("move-in-animation")

            // Update the progress bar
            const updateProgressBar = async () => {
                // Get the progress bar
                const progressBar = this._GLOBALS.create_command_progress_bar;

                // Modify the progress bar to use an animation
                progressBar.classList.add("progress-bar-animated");

                // Set the progress bar to 100%
                progressBar.style.width = `${100}%`;

                // Wait for the command elements to be created
                await this.createCommandElements();

                // Modify the progress bar
                progressBar.innerText = "Done!";
                progressBar.classList.remove("progress-bar-animated");
                progressBar.classList.add("bg-success");

                // Disable the button from the event listener
                (e.target as HTMLElement).removeAttribute("disabled");

                // Add the move in animation to the next step
                this._GLOBALS.generate_step_2.classList.remove("move-out-animation");
                this._GLOBALS.generate_step_2.classList.add("move-in-animation");

            }

            updateProgressBar();
        })
    }

    /**
     * Creates a command from a array of lines
     * @param book An array of lines
     * @param author The author of the book
     * @param title The prefix title of the book (the book number will be added to the end, for example: Book [1])
     * @returns The command
     */
    createCommand(book: string[], author: string, title: string): string {
        // Create an array of page JSON strings, containing 14 lines each
        let lines = '';

        const pageStrings = book.map((line, index) => {

            // Add the line to the lines string
            lines += line + " ";

            // If the index is divisible by 14, return the page string
            if ((index + 1) % 14 === 0) {
                const pageString = `'{"text":"${lines}"}'`;
                lines = '';
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
            id: "minecraft:written_book",
            author: author,
            title: title,
            pages: pageStrings
        };

        // Convert the book item to a command string
        const command = `/give @p ${bookItem.id}{pages:[${bookItem.pages}], title: "${bookItem.title}", author: "${bookItem.author}"}`

        // Return the command string
        return command;
    }
}

new App();