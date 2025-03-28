<h1 align="center">
  <br>
  <a href="https://thewilley.github.io/Text2Book/"><img src="text2book.png" alt="Text2Book" width="200"></a>
  <br>
  Text2Book
  <br>
</h1>

<h4 align="center"> A tool to convert text to Minecraft books </h4>

<p align="center">
  <a href='https://github.com/TheWilley/Text2Book/releases/latest'><img alt="GitHub release (with filter)" src="https://img.shields.io/github/v/release/TheWilley/Text2Book"></a>
  <a href='https://github.com/TheWilley/Text2Book/blob/main/LICENSE'><img src="https://img.shields.io/badge/license-MIT-blue" alt='license MIT' /></a>
  <a href='https://github.com/TheWilley/Text2Book/issues'> <img src='https://img.shields.io/github/issues/TheWilley/Text2Book.svg' alt='Github Issues'></a>
</p>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#features">Features</a> •
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
- **Export and Import**: Save your progress and import it later to continue working on your Minecraft book.
- **Minecraft Version Selection**: ~~Choose between Java and Bedrock versions to generate the appropriate commands.~~ (Only Java works for now — Bedrock is under development, see [#21](https://github.com/TheWilley/Text2Book/issues/21))
- **Incredible Speed**: Generates entire books in seconds by using the very same algorithm implemented in Minecraft (_all Harry Potter books combined in 3 seconds!_).
- **Copy to Clipboard**: Easily copy the generated commands or text lines to your clipboard for quick in-game implementation.

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
