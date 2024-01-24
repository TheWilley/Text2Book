import { useState } from 'react';
import { ShowResults } from '../global/types.ts';
import start from '../utils/main.ts';

export default function useApp() {
  const [results, setResults] = useState<string[]>([]);
  const [fadeIn, setFadeIn] = useState(0);
  const allowedProps = { fadein: fadeIn };

  const showResults: ShowResults = (
    text: string,
    author: string,
    title: string,
    outputFormat: 'commands' | 'text'
  ) => {
    setResults(start(text, author, title, outputFormat));
    setFadeIn(1);
  };

  return { results, allowedProps, showResults, setFadeIn };
}
