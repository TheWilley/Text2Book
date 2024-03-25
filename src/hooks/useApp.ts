import { useCallback, useEffect, useMemo, useState } from 'react';
import { IResults } from '../global/types.ts';
import { BookOutput, BookParameters } from '../utils/MinecraftBook.ts';

export default function useApp() {
  const [results, setResults] = useState<BookOutput>([]);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(0);
  const worker: Worker = useMemo(
    () => new Worker(new URL('../utils/worker.ts', import.meta.url), { type: 'module' }),
    []
  );

  const fadeinProps = { fadein: fadeIn };

  const showResults: IResults = useCallback(
    (
      text: string,
      title: string,
      author: string,
      minecraftVersion: 'bedrock' | 'java',
      outputFormat: 'commands' | 'text',
      linesPerPage: number,
      nameSuffix: string
    ) => {
      const inputParams: BookParameters = {
        text,
        title,
        author,
        minecraftVersion,
        outputFormat,
        linesPerPage,
        nameSuffix,
      };
      if (window.Worker) {
        setLoading(true);
        worker.postMessage(inputParams);
      }
    },
    [worker]
  );

  useEffect(() => {
    if (window.Worker) {
      worker.onmessage = (e) => {
        setResults(e.data as BookOutput);
        setFadeIn(1);
        setLoading(false);
      };
    }
  }, [worker]);

  return { results, fadeinProps, loading, showResults, setFadeIn };
}
