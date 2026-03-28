import glyphs from '../data/glyphs.json';

// Creates a fixed-size buffer of 65,536 unsigned 8-bit integers
// Initialized to 0 by default.
// We don't use this in practice, but is kept to keep in line with the original code
const glyphWidth = new Uint8Array(65536);

// A simple boolean, set to false as decalred but unset booleans in java
// defaults to it
const unicodeFlag = false;

export function getArr(text: string) {
  const result = drawSplitString(text, 114);
  return result;
}

/**
 * Splits and draws a String with wordwrap (maximum length is parameter k)
 */
function drawSplitString(str: string, wrapWidth: number): string[] {
  str = trimStringNewline(str);
  const lines = renderSplitString(str, wrapWidth);

  return lines;
}

/**
 * Remove all newline characters from the end of the string
 */
function trimStringNewline(text: string): string {
  while (text != null && text.endsWith('\n')) {
    text = text.substring(0, text.length - 1);
  }

  return text;
}

/**
 * Perform actual work of rendering a multi-line string with wordwrap and with darker drop shadow color if flag is
 * set
 */
function renderSplitString(str: string, wrapWidth: number): string[] {
  const lines = [];
  for (const s of listFormattedStringToWidth(str, wrapWidth)) {
    lines.push(s);
  }
  return lines;
}

function listFormattedStringToWidth(str: string, wrapWidth: number): string[] {
  return wrapFormattedStringToWidth(str, wrapWidth).split('\n');
}

/**
 * Inserts newline and formatting into a string to wrap it within the specified width.
 */
function wrapFormattedStringToWidth(str: string, wrapWidth: number): string {
  const i = sizeStringToWidth(str, wrapWidth);

  if (str.length <= i) {
    return str;
  } else {
    const s = str.substring(0, i);
    const c0 = str.charAt(i);
    const flag = c0 === ' ' || c0 === '\n';

    const s1 = getFormatFromString(s) + str.substring(i + (flag ? 1 : 0));

    return s + '\n' + wrapFormattedStringToWidth(s1, wrapWidth);
  }
}

/**
 * Digests a string for nonprinting formatting characters
 * then returns a string containing only that formatting.
 */
function getFormatFromString(text: string): string {
  let s = '';
  let i = -1;
  const j = text.length;

  while ((i = text.indexOf('\u00a7', i + 1)) !== -1) {
    if (i < j - 1) {
      const c0 = text.charAt(i + 1);

      if (isFormatColor(c0)) {
        s = '\u00a7' + c0;
      } else if (isFormatSpecial(c0)) {
        s = s + '\u00a7' + c0;
      }
    }
  }

  return s;
}

/**
 * Determines how many characters from the string will fit into the specified width.
 */
function sizeStringToWidth(str: string, wrapWidth: number): number {
  const length = str.length;
  let f = 0.0;
  let j = 0;
  let k = -1;
  let isBold = false;

  for (; j < length; ++j) {
    const c0 = str.charAt(j);

    switch (c0) {
      case '\n':
        // Back up index to handle the increment in the loop header
        --j;
        break;

      case ' ':
        // Record the last seen space for clean word-wrapping
        k = j;
      // eslint-disable-next-line no-fallthrough
      default:
        f += getCharWidthFloat(c0);

        if (isBold) {
          ++f; // Bold characters are 1px wider
        }
        break;

      case '\u00a7': // The '§' formatting symbol
        if (j < length - 1) {
          ++j;
          const c1 = str.charAt(j);

          if (c1 !== 'l' && c1 !== 'L') {
            // If it's a color or reset code, bold is turned off
            if (c1 === 'r' || c1 === 'R' || isFormatColor(c1)) {
              isBold = false;
            }
          } else {
            isBold = true;
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

  // Return the last space index if we hit a width limit mid-word,
  // otherwise return the current index.
  return j !== length && k !== -1 && k < j ? k : j;
}

/**
 * Checks if the char code is a hexadecimal character, used to set colour.
 */
function isFormatColor(colorChar: string): boolean {
  return (
    (colorChar >= '0' && colorChar <= '9') ||
    (colorChar >= 'a' && colorChar <= 'f') ||
    (colorChar >= 'A' && colorChar <= 'F')
  );
}

/**
 * Checks if the char code is O-K...lLrRk-o... used to set special formatting.
 */
function isFormatSpecial(formatChar: string): boolean {
  return (
    (formatChar >= 'k' && formatChar <= 'o') ||
    (formatChar >= 'K' && formatChar <= 'O') ||
    formatChar == 'r' ||
    formatChar == 'R'
  );
}

/**
 * Determines the floating-point width of a single character.
 */
function getCharWidthFloat(charInput: string): number {
  // Ensure we are working with the character code (integer)
  const charCode = typeof charInput === 'string' ? charInput.charCodeAt(0) : charInput;

  if (charCode === 167) {
    // The '§' symbol
    return -1.0;
  }

  if (charCode !== 32 && charCode !== 160) {
    const i = getCharacterWidthFromGlyph(String.fromCharCode(charCode));

    if (charCode > 0 && i !== -1 && !unicodeFlag) {
      // We do +1 because we account for spacing between each character
      return i + 1;
    } 
    // In theory we should never land here
    else if (glyphWidth[charCode] !== 0) {
      // Extracting bit-packed width data
      const j = glyphWidth[charCode]! & 255;
      const k = j >>> 4; // High nibble
      const l = j & 15; // Low nibble
      return (l + 1 - k) / 2 + 1;
    } else {
      return 0.0;
    }
  } else {
    // Return the width of a standard space
    return 4;
  }
}

function getCharacterWidthFromGlyph(char: string) {
  return glyphs.find((glyph) => glyph.char === char)?.pixels || 0;
}

export function getLines(text: string) {
  const result = getArr(text).filter((res) => res.length !== 0);
  return result;
}
