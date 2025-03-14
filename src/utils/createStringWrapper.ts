import { MinecraftCharacter } from '../global/types';

/**
 * Splits the given string into lines of a maximum width, trimming trailing newlines.
 *
 * @param str The string to split.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns An array of strings representing the wrapped lines.
 */
function getSplitString(
  str: string,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): string[] {
  str = trimStringNewline(str);
  return listFormattedStringToWidth(str, 114, lexicon, removedCharacters);
}

/**
 * Creates a string wrapper object, encapsulating functions to handle string formatting and character removal tracking.
 *
 * @param lexicon The lexicon containing Minecraft character data.
 * @returns The string wrapper object containing the `getSplitString` function and a list of removed characters.
 */
function createStringWrapper(lexicon: MinecraftCharacter[]) {
  const removedCharacters: string[] = [];

  return {
    /**
     * Splits the input string into lines of a maximum width, trimming trailing newlines.
     *
     * @param str The string to split.
     * @returns An array of strings representing the wrapped lines.
     */
    getSplitString: (str: string): string[] =>
      getSplitString(str, lexicon, removedCharacters),

    // The list of characters that were removed from the lexicon.
    removedCharacters,
  };
}

/**
 * Removes trailing newlines from the given string.
 *
 * @param text The string to trim.
 * @returns The trimmed string.
 */
function trimStringNewline(text: string): string {
  while (text && text.endsWith('\n')) {
    text = text.substring(0, text.length - 1);
  }
  return text;
}

/**
 * Converts the string to an array of lines by wrapping it to the specified width.
 *
 * @param str The string to be formatted.
 * @param wrapWidth The width at which the string should wrap.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns An array of strings representing the wrapped text.
 */
function listFormattedStringToWidth(
  str: string,
  wrapWidth: number,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): string[] {
  return wrapFormattedStringToWidth(str, wrapWidth, lexicon, removedCharacters).split(
    '\n'
  );
}

/**
 * Wraps the formatted string to fit within the specified width and returns the wrapped string.
 *
 * @param str The string to be wrapped.
 * @param wrapWidth The width at which the string should wrap.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns The wrapped string.
 */

function wrapFormattedStringToWidth(
  str: string,
  wrapWidth: number,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): string {
  const result: string[] = [];
  let remainingStr = str;

  while (remainingStr.length > 0) {
    const i = sizeStringToWidth(remainingStr, wrapWidth, lexicon, removedCharacters);
    const s = remainingStr.substring(0, i);
    const c0 = remainingStr.charAt(i);
    const flag = c0 === ' ' || c0 === '\n';
    remainingStr = remainingStr.substring(i + (flag ? 1 : 0));
    result.push(s);
  }

  return result.join('\n');
}

/**
 * Retrieves the width of a character from the lexicon. If the character is not found, it's added to the removed characters list.
 *
 * @param c The character whose width is to be calculated.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns The width of the character.
 */
function getCharWidth(
  c: string,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): number {
  const minecraftCharacter = lexicon.find((character) => character.char === c);

  if (!minecraftCharacter) {
    removedCharacters.push(c);
    return 0;
  }

  if (minecraftCharacter.char === ' ') {
    return minecraftCharacter.pixels;
  } else {
    return minecraftCharacter.pixels + 1;
  }
}

/**
 * Calculates the width of a string and determines the position to wrap the text based on the lexicon and wrap width.
 *
 * @param str The input string to be wrapped.
 * @param wrapWidth The width at which the string should wrap.
 * @param lexicon The lexicon containing Minecraft character data.
 * @param removedCharacters The list of characters that were not found in the lexicon.
 * @returns The index where the string should wrap.
 */

function sizeStringToWidth(
  str: string,
  wrapWidth: number,
  lexicon: MinecraftCharacter[],
  removedCharacters: string[]
): number {
  const i = str.length;
  let f = 0;
  let j = 0;
  let k = -1;

  for (let flag = false; j < i; ++j) {
    const c0 = str.charAt(j);

    switch (c0) {
      case '\n': {
        --j;
        break;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      case ' ': {
        k = j;
      }
      // eslint-disable-next-line no-fallthrough
      default: {
        f += getCharWidth(c0, lexicon, removedCharacters);

        if (flag) {
          ++f;
        }
        break;
      }
      case '\u00a7':
        if (j < i - 1) {
          ++j;
          const c1 = str.charAt(j);

          if (c1 !== 'l' && c1 !== 'L') {
            if (c1 === 'r' || c1 === 'R') {
              flag = false;
            }
          } else {
            flag = true;
          }
        }
    }

    if (c0 === '\n') {
      ++j;
      k = j;
      break;
    }

    if (f > wrapWidth) {
      break;
    }
  }

  return j !== i && k !== -1 && k < j ? k : j;
}

export default createStringWrapper;
