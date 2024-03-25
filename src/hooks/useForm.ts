import { IFormData, IResults } from '../global/types.ts';
import useLocalStorage from 'use-local-storage';

export default function useForm(showResults: IResults): IFormData {
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
  const [linesPerPage, setLinesPerPage] = useLocalStorage('linesPerPage', 14);
  const [minecraftVersion, setMinecraftVersion] = useLocalStorage<'bedrock' | 'java'>(
    'minecraftVersion',
    'bedrock'
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    showResults(
      text,
      title,
      author,
      minecraftVersion,
      outputFormat,
      linesPerPage,
      nameSuffix
    );
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
    linesPerPage,
    setLinesPerPage,
    nameSuffix,
    setNameSuffix,
    author,
    setAuthor,
    title,
    setTitle,
    handleSubmit,
  };
}
