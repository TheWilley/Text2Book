import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IApp, IResults } from '../global/types.ts';
import { BookOutput, BookParameters } from '../utils/MinecraftBook.ts';
import useLocalStorage from 'use-local-storage';

export default function useApp(): IApp {
  const [results, setResults] = useState<BookOutput>({
    book: [],
    removedCharacters: [],
  });
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(0);
  const [timeToGenerate, setTimeToGenerate] = useState(0);
  const [outputFormat, setOutputFormat] = useLocalStorage<'text' | 'file'>(
    'outputFormat',
    'text'
  );
  const worker: Worker = useMemo(
    () => new Worker(new URL('../utils/worker.ts', import.meta.url), { type: 'module' }),
    []
  );
  const generationTimes = useRef<number[]>([]);

  const fadeinProps = { fadein: fadeIn };

  const showResults: IResults = useCallback(
    (
      text: string,
      title: string,
      author: string,
      minecraftVersion: 'bedrock' | 'java',
      generationFormat: 'commands' | 'text',
      javaVersion: '1.20.4' | '1.20.5',
      linesPerPage: number,
      nameSuffix: string
    ) => {
      generationTimes.current = [];
      generationTimes.current.push(Date.now());
      const inputParams: BookParameters = {
        text,
        title,
        author,
        minecraftVersion,
        generationFormat,
        javaVersion,
        linesPerPage,
        nameSuffix,
      };
      if (window.Worker) {
        setLoading(true);

        // Wait 0.5s to show the loading spinner and avoid flickering
        setTimeout(() => {
          worker.postMessage(inputParams);
        }, 500);
      }
    },
    [worker]
  );

  useEffect(() => {
    if (window.Worker) {
      worker.onmessage = (e) => {
        generationTimes.current.push(Date.now());
        setResults(e.data as BookOutput);
        setFadeIn(1);
        setLoading(false);
        setTimeToGenerate(
          (generationTimes.current[generationTimes.current.length - 1] -
            generationTimes.current[0]) /
            1000
        );
      };
    }
  }, [worker]);

  return {
    results,
    fadeinProps,
    loading,
    timeToGenerate,
    outputFormat,
    showResults,
    setOutputFormat,
    setFadeIn,
  };
}
