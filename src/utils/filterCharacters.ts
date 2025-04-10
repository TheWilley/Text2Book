function filterCharacters(characters: string[], text: string) {
  // Return all characters which does not exist in the characters array but are in the text
  const unsupportedCharacters: string[] = [];
  for (const char of text) {
    if (!characters.includes(char) && !unsupportedCharacters.includes(char)) {
      unsupportedCharacters.push(char);
    }
  }

  const filteredText = text
    .split('')
    .filter((char) => characters.includes(char))
    .join('');

  return [unsupportedCharacters, filteredText] as const;
}

export default filterCharacters;
