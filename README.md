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
Minecraft books work by using a font where each character is `x` amount of "dots" long. Because the amount of dots have to be manually defined for a given character, only the English alphabet along with a few special characters are supported. 

If you find one or many characters that is not supported, please [open an issue](https://github.com/TheWilley/text2book/issues) with the character and the amount of dots it should be. Please refer to the [Minecraft wiki page](https://minecraft.fandom.com/wiki/Language#Font) for more information. For a list of supported characters, see [chars.md](docs/chars.md).