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
        new MinecraftChar("A", 5),
        new MinecraftChar("B", 5),
        new MinecraftChar("C", 5),
        new MinecraftChar("D", 5),
        new MinecraftChar("E", 5),
        new MinecraftChar("F", 5),
        new MinecraftChar("G", 5),
        new MinecraftChar("H", 5),
        new MinecraftChar("I", 3),
        new MinecraftChar("J", 5),
        new MinecraftChar("K", 5),
        new MinecraftChar("L", 5),
        new MinecraftChar("M", 5),
        new MinecraftChar("N", 5),
        new MinecraftChar("O", 5),
        new MinecraftChar("P", 5),
        new MinecraftChar("Q", 5),
        new MinecraftChar("R", 5),
        new MinecraftChar("S", 5),
        new MinecraftChar("T", 5),
        new MinecraftChar("U", 5),
        new MinecraftChar("V", 5),
        new MinecraftChar("W", 5),
        new MinecraftChar("X", 5),
        new MinecraftChar("Y", 5),
        new MinecraftChar("Z", 5),
        new MinecraftChar("a", 5),
        new MinecraftChar("b", 5),
        new MinecraftChar("c", 5),
        new MinecraftChar("d", 5),
        new MinecraftChar("e", 5),
        new MinecraftChar("f", 4),
        new MinecraftChar("g", 5),
        new MinecraftChar("h", 5),
        new MinecraftChar("i", 1),
        new MinecraftChar("j", 5),
        new MinecraftChar("k", 4),
        new MinecraftChar("l", 2),
        new MinecraftChar("m", 5),
        new MinecraftChar("n", 5),
        new MinecraftChar("o", 5),
        new MinecraftChar("p", 5),
        new MinecraftChar("q", 5),
        new MinecraftChar("r", 5),
        new MinecraftChar("s", 5),
        new MinecraftChar("t", 3),
        new MinecraftChar("u", 5),
        new MinecraftChar("v", 5),
        new MinecraftChar("w", 5),
        new MinecraftChar("x", 5),
        new MinecraftChar("y", 5),
        new MinecraftChar("z", 5),
        new MinecraftChar("0", 5),
        new MinecraftChar("1", 5),
        new MinecraftChar("2", 5),
        new MinecraftChar("3", 5),
        new MinecraftChar("4", 5),
        new MinecraftChar("5", 5),
        new MinecraftChar("6", 5),
        new MinecraftChar("7", 5),
        new MinecraftChar("8", 5),
        new MinecraftChar("9", 5),
        new MinecraftChar("!", 1),
        new MinecraftChar("@", 6),
        new MinecraftChar("#", 5),
        new MinecraftChar("$", 5),
        new MinecraftChar("£", 5),
        new MinecraftChar("%", 5),
        new MinecraftChar("^", 5),
        new MinecraftChar("&", 5),
        new MinecraftChar("*", 3),
        new MinecraftChar("(", 3),
        new MinecraftChar(")", 3),
        new MinecraftChar("_", 5),
        new MinecraftChar("-", 5),
        new MinecraftChar("+", 5),
        new MinecraftChar("=", 5),
        new MinecraftChar("~", 6),
        new MinecraftChar("[", 3),
        new MinecraftChar("]", 3),
        new MinecraftChar("{", 3),
        new MinecraftChar("}", 3),
        new MinecraftChar("|", 1),
        new MinecraftChar("\"", 3),
        new MinecraftChar(":", 1),
        new MinecraftChar(";", 1),
        new MinecraftChar("'", 1),
        new MinecraftChar('"', 3),
        new MinecraftChar(",", 1),
        new MinecraftChar(".", 1),
        new MinecraftChar("<", 4),
        new MinecraftChar(">", 4),
        new MinecraftChar(".", 1),
        new MinecraftChar("?", 5),
        new MinecraftChar("/", 5),
        new MinecraftChar(" ", 3),
        new MinecraftChar("`", 2),
        new MinecraftChar("“", 4),
        new MinecraftChar("”", 4),
    ]

    constructor(text: string) {
        this._text = text;
    }

    /**
     * Calculates the amount of dots in a word
     * @param word The word to calculate the letters of
     * @returns The lines and the sum of the dots
     */
    calculateLetters(word: string): [string[], number] {
        let sum: number = 0, lines: string[] = [], stored_index: number = 0, substringed_word: string = "";
        const ms: number = 114

        // Go trough each letter
        for (let i = 0; i < word.length; i++) {
            // Store the index
            stored_index = i;

            // Get the character
            let mcChar = this._allChars.find((c) => c.letter == word.charAt(i));

            // If the character is not found, return
            if (!mcChar) return [[], 0];

            // Add the dots
            sum += mcChar.dots;

            // Set the substringed word
            substringed_word = word.substring(0, i);

            // Check if the sum is bigger than the max sum
            if (sum + substringed_word.length + 1 > ms) {
                // Add the word to the array
                lines.push(substringed_word);

                // Remove the word from the string
                word = word.substring(i);

                // Reset the index and sum
                i = sum = 0
            }
        }

        // Add the last word
        lines.push(word);

        // Return the lines, the rest of the word and the sum + the length of the rest of the word + 4 to account for the spaces
        return [lines, sum + substringed_word.length + 4]
    }

    /**
     * Calculates the lines of the text
     * @returns The lines as a string array
     */
    getLines() {
        let words: string[] = [], rows: string[] = [], lines: string[] = [], rest: string = "", sum = 0, temp_sum = 0, new_rows = [], i2 = 0, text = this._text;

        // Split the string into words
        words = text.split(" ");

        // Go trough each word
        for (let i = 0; i < words.length; i++) {
            // Get the letters
            [lines, temp_sum] = this.calculateLetters(words[i]);

            for (let e = 0; e < lines.length; e++) {
                // Add the sum
                sum += this.calculateLetters(lines[e])[1];

                // If the sum is bigger than 114, reset the sum to the word which wrapped
                if (sum > 114) {
                    sum = temp_sum;
                    new_rows.push(rows.join(" "));
                    rows = [];
                    i2 = i;
                }

                // Add the letters to the rows
                rows.push(lines[e]);
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

        console.log(this._lines)

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
                let command = this.createCommand(copy_of_lines.splice(0, amount_of_lines), this._GLOBALS.author.value == "" ? "Author": this._GLOBALS.author.value, `${this._GLOBALS.title.value == "" ? "Book": this._GLOBALS.title.value} [${amount_of_books}]`);

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
    createCommand(book: string[], author: string, title:string): string {
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
        const command = `/give @p ${bookItem.id}{pages:[${bookItem.pages}], title: "${bookItem.title}", author: "${bookItem.author}"}`.replace(/\\/g, '');

        // Return the command string
        return command;
    }
}

new App();