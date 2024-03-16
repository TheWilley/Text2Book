import { useState } from 'react';
import { IShowResults } from '../global/types.ts';
import BookGenerator from '../utils/MinecraftBook';

export default function useApp() {
  const [results, setResults] = useState<string[]>([]);
  const [fadeIn, setFadeIn] = useState(0);

  const allowedProps = { fadein: fadeIn };

  const showResults: IShowResults = (
    text: string,
    title: string,
    author: string,
    minecraftVersion: 'bedrock' | 'java',
    outputFormat: 'commands' | 'text',
    nameSuffix: string
  ) => {
    const bookGenerator = new BookGenerator(
      text,
      title,
      author,
      minecraftVersion,
      outputFormat,
      nameSuffix
    );
    setResults(bookGenerator.book);
    setFadeIn(1);
  };

  return { results, allowedProps, showResults, setFadeIn };
}
