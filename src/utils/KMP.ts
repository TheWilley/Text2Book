function checkNextCharacterIsSpace(originalText: string, targetLine: string): boolean {
    function buildKMPTable(pattern: string): number[] {
      const table: number[] = [0];
      let prefixLen = 0;
  
      for (let i = 1; i < pattern.length; i++) {
        while (prefixLen > 0 && pattern[i] !== pattern[prefixLen]) {
          prefixLen = table[prefixLen - 1];
        }
  
        if (pattern[i] === pattern[prefixLen]) {
          prefixLen++;
        }
  
        table[i] = prefixLen;
      }
  
      return table;
    }
  
    function kmpSearch(text: string, pattern: string): number {
      const table = buildKMPTable(pattern);
      let textIndex = 0;
      let patternIndex = 0;
  
      while (textIndex < text.length) {
        if (text[textIndex] === pattern[patternIndex]) {
          textIndex++;
          patternIndex++;
          if (patternIndex === pattern.length) {
            return textIndex - pattern.length;
          }
        } else {
          if (patternIndex > 0) {
            patternIndex = table[patternIndex - 1];
          } else {
            textIndex++;
          }
        }
      }
  
      return -1;
    }
  
    // Find the position of the target line in the original text using KMP search
    const position = kmpSearch(originalText, targetLine);
    if (position === -1) {
      return false; // The target line is not found in the original text
    }
  
    // Check if the next character after the target line is a space
    const nextCharacterPosition = position + targetLine.length;
    if (nextCharacterPosition < originalText.length) {
      const nextCharacter = originalText.charAt(nextCharacterPosition);
      return nextCharacter === ' ';
    } else {
      return false; // The target line is the last line in the original text
    }
  }
  
export default checkNextCharacterIsSpace;