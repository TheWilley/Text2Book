import getChars from './minecraftChars.ts';
import returnCommands from './commandHandler.ts';
import returnText from './textHandler.ts';

type DotsOfWordType = { word: string; value: number }[];

// Processing order:
// getLines => calculateLetters => getCommands / getRawText => createCommand

/**
 * Initiates the conversion process
 */
export default function start(
  text: string,
  author: string,
  title: string,
  outputFormat: 'commands' | 'text'
) {
  // Step 1 - Get all lines
  const lines = getLines(text);

  if (outputFormat === 'text') {
    // Step (2) - Pass lines to generate text
    return returnText(lines);
  } else {
    // Step (2) - Pass lines along with author and title to generate commands
    return returnCommands(lines, author, title);
  }
}

/**
 * Calculates the amount of dots in a word
 * @param word The word to calculate the letters of
 * @returns The lines and the sum of the dots
 */
export function getDotsOfWord(word: string): DotsOfWordType {
  const words: DotsOfWordType = [],
    allChars = getChars(),
    ms = 114;
  let total_dots = 0,
    substringed_word = '';

  // Go through each letter
  for (let i = 0; i < word.length; i++) {
    // Get the character
    const mcChar = allChars.find((character) => character.letter == word.charAt(i));

    // If the character is not found, remove it and break the loop
    if (!mcChar) {
      word = word.substring(0, i) + word.substring(i + 1);
      i--;
      continue;
    }

    // Add the dots
    total_dots += mcChar.dots;

    // Set the substringed word
    substringed_word = word.substring(0, i + 1);

    // Check if the sum is bigger than the max sum
    if (total_dots > ms) {
      // Remove the last letter
      substringed_word = substringed_word.substring(0, substringed_word.length - 1);

      // Add the word to the array
      words.push({ word: substringed_word, value: total_dots });

      // Remove the word from the string including the last letter
      word = word.substring(i);

      // Reset the index and sum
      total_dots = 0;
      i = -1;
    }
  }

  // Add the last word
  words.push({ word: word, value: total_dots });

  // Return the words
  return words;
}

/**
 * Calculates the lines of the text
 * @returns The lines as a string array
 */
export function getLines(text: string) {
  let lines: string[] = [],
    words: DotsOfWordType = [],
    sum = 0;
  const new_lines = [];

  // Removes all trailing spaces of new lines
  // Splits the text into words to calculate their lengths separately
  const spliced_words = text.replace(/ +\n/g, '\n').split(/(\s)/g);

  // Go through each word
  for (let i = 0; i < spliced_words.length; i++) {
    // Get the sum of the words letters
    words = getDotsOfWord(spliced_words[i]);

    // Go through each word
    for (let e = 0; e < words.length; e++) {
      // Add the sum of the letters and the spaces
      sum += words[e].value;

      // If the sum is bigger than 114, reset the sum to the word which caused the overflow
      // The reason we ignore the space is that it will not occupy a space if it's the very last word in the row
      if (words[e].word === '\n' || (words[e].word != ' ' && sum > 114)) {
        sum = words[e].value;

        new_lines.push(lines.join(''));
        lines = [];
      }

      // Add the letters to the lines
      lines.push(words[e].word);
    }
  }

  // Add the rest of the words to the lines
  new_lines.push(lines.join('').trim());

  // Return the lines and remove empty lines
  return new_lines.filter((r) => r != '');
}
