# text2book
A tool to convert text to Minecraft books

## Usage
[Go to the official website](https://thewilley.github.io/text2book/)

## Installation
Install dependencies:
```bash
npm i
```

Build the project:
```bash
npm run build
```

Open `index.html` in the dist folder.

## Report missing characters
Minecraft books work by using a font where each character is `x` amount of "dots" long. Because the amount of dots have to be manually defined for a given character, only the main ascii characters are supported (for now)