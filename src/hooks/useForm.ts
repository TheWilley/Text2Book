import { useState } from 'react';
import { FormData, ShowResults } from '../global/types.ts';
import useLocalStorage from 'use-local-storage';

export default function useForm(showResults: ShowResults): FormData {
  // Normal states
  const [text, setText] = useLocalStorage('text', '');
  const [author, setAuthor] = useLocalStorage('author', '');
  const [title, setTitle] = useLocalStorage('title', '');
  const [appendIndex, setAppendIndex] = useLocalStorage('appendIndex', false);
  const [inputFormat, setInputFormat] = useLocalStorage<'text' | 'file'>(
    'inputFormat',
    'text'
  );
  const [outputFormat, setOutputFormat] = useLocalStorage<'commands' | 'text'>(
    'outputFormat',
    'commands'
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const run = async () => {
      // Wait 0.5 seconds to show the loading icon
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      showResults(text, author, title, outputFormat, appendIndex);
      setLoading(false);
    };
    setLoading(true);
    void run();
  };

  return {
    inputFormat,
    setInputFormat,
    outputFormat,
    setOutputFormat,
    text,
    setText,
    appendIndex,
    setAppendIndex,
    author,
    setAuthor,
    title,
    setTitle,
    handleSubmit,
    loading,
  };
}
