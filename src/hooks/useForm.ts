import { useEffect, useState } from 'react';
import { ShowResults } from '../global/types.ts';

export default function useForm(showResults: ShowResults) {
  // Normal states
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputFormat, setInputFormat] = useState<'text' | 'file'>('text');
  const [outputFormat, setOutputFormat] = useState<'commands' | 'text'>('commands');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const run = async () => {
      // Wait 0.5 seconds to show the loading icon
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      showResults(text, author, title, outputFormat);
      setLoading(false);
    };
    setLoading(true);
    void run();
  };

  const handleChangeText = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    setText(target.value);

    localStorage.setItem('text', target.value);
  };

  const handleChangeAuthor = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    setAuthor(target.value);

    localStorage.setItem('author', target.value);
  };

  const handleChangeTitle = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);

    localStorage.setItem('title', target.value);
  };

  useEffect(() => {
    setText(localStorage.getItem('text') || '');
    setAuthor(localStorage.getItem('author') || '');
    setTitle(localStorage.getItem('title') || '');
  }, []);

  return {
    loading,
    inputFormat,
    setInputFormat,
    outputFormat,
    setOutputFormat,
    handleSubmit,
    text,
    setText,
    handleChangeText,
    author,
    handleChangeAuthor,
    title,
    handleChangeTitle,
  };
}
