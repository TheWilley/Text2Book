<h1 align="center">
  <br>
  <a href="https://thewilley.github.io/FruityDancitor/"><img src="text2book.png" alt="FruityDancitor" width="200"></a>
  <br>
  Text2Book
  <br>
</h1>

<h4 align="center"> A tool to convert text to Minecraft books </h4>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#features">Features</a> •
  <a href="#generation-modes">Generation Modes</a> •
  <a href="#usage">Usage</a> •
  <a href="#license">License</a>
</p>

## Introduction

Text2Book is a web application that allows users to convert text into Minecraft books by generating commands for command
blocks or text sections which can be manually copied over. This tool is designed to simplify the process of creating
in-game books with custom content for Minecraft players and mapmakers. Instead of manually entering lengthy commands or
taking a wild guess how much text to copy over on each page, Text2Book automates the process, making it quicker and more
user-friendly.

## Features

- **Text and File Input**: Enter the desired text content directly into the application or upload a text file.
- **Command and Text Generation**: Generate the necessary commands or text section to create the Minecraft books with the desired content.
- **File and Text output**: Save generated content as a file or display directly within the app in a list.
- **Copy to Clipboard**: Easily copy the generated commands or text lines to your clipboard for quick in-game implementation.

## Generation Modes

There are two generation modes you can choose from: **Commands** or **Text**.

### Text Generation:

1. **Input Text**: Enter the content you wish to appear in your Minecraft book in the designated text box.

2. **Generate Text**: Click the "Generate" button after entering your desired content. The application will process
   your input and generate the necessary sections of text for your Minecraft book.

3. **Copy Text**: Once the text sections are generated, they will be displayed on the screen. Click the "Copy" button next to a section to copy it to your clipboard.

4. **Implement in Minecraft**: Open Minecraft and access the book interface. Paste the copied text sections into each page of the book manually.

### Command Generation

1. **Input Text**: Enter the content you wish to appear in your Minecraft book in the designated text box.

2. **Generate Command**: Click the "Generate" button after entering your desired content. The application will process your input and generate the necessary commands for your Minecraft book.

3. **Copy Commands**: Once the commands are generated, you will see them on the screen. Click the "Copy" button next to a command to copy it to your clipboard.

4. **Choose Minecraft Version**: Pick either Java or Bedrock depending on which version you're using.

4. **Implement in Minecraft**: Open your Minecraft world and access a command block. Paste the copied commands into the command block to create the Minecraft book. Activate the command block to add the book to your inventory.

## Usage

Simply go to the [official webpage](https://thewilley.github.io/Text2Book/) to get started, or run the app yourself by following these steps:

```bash
# Clone this repository
$ git clone https://github.com/thewilley/Text2Book.git

# Go into the repository
$ cd Text2Book

# Install dependencies
$ npm install

# Build app
$ npm run build

# If you want to start the app
$ npm run preview

# If you want to develop the app
$ npm run dev
```

## License

Text2Book is licensed under the [MIT License](LICENSE), which allows you to use, modify, and distribute the code for
personal and commercial purposes. However, it comes with no warranties or guarantees. If you use Text2Book, please
provide attribution to the original repository and authors.

---

I hope you find Text2Book useful for creating custom Minecraft books! Enjoy your Minecraft adventures with personalized
in-game books! If you have any questions or encounter any issues, feel free to reach out to me through the repository's
issue tracker. Happy gaming!
