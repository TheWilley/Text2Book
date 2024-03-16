import { useState } from 'react';
import { IFormData, IShowResults } from '../global/types.ts';
import useLocalStorage from 'use-local-storage';

export default function useForm(showResults: IShowResults): IFormData {
  // Normal states
  const [text, setText] = useLocalStorage('text', '');
  const [author, setAuthor] = useLocalStorage('author', '');
  const [title, setTitle] = useLocalStorage('title', '');
  const [nameSuffix, setNameSuffix] = useLocalStorage('nameSuffix', '');
  const [inputFormat, setInputFormat] = useLocalStorage<'text' | 'file'>(
    'inputFormat',
    'text'
  );
  const [outputFormat, setOutputFormat] = useLocalStorage<'commands' | 'text'>(
    'outputFormat',
    'commands'
  );
  const [minecraftVersion, setMinecraftVersion] = useLocalStorage<'bedrock' | 'java'>(
    'minecraftVersion',
    'bedrock'
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const run = async () => {
      // Wait 0.5 seconds to show the loading icon
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      showResults(text, title, author, minecraftVersion, outputFormat, nameSuffix);
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
    minecraftVersion,
    setMinecraftVersion,
    text,
    setText,
    nameSuffix,
    setNameSuffix,
    author,
    setAuthor,
    title,
    setTitle,
    handleSubmit,
    loading,
  };
}
