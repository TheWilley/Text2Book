import {
  CommandTarget,
  GenerationFormat,
  IFormData,
  InputFormat,
  IResults,
  JavaVersion,
  MinecraftVersion,
  OutputFormat,
} from '../global/types.ts';
import useLocalStorage from 'use-local-storage';

export default function useForm(showResults: IResults): IFormData {
  // Normal states
  const [text, setText] = useLocalStorage('text', '');
  const [author, setAuthor] = useLocalStorage('author', '');
  const [title, setTitle] = useLocalStorage('title', '');
  const [nameSuffix, setNameSuffix] = useLocalStorage('nameSuffix', '');
  const [inputFormat, setInputFormat] = useLocalStorage<InputFormat>(
    'inputFormat',
    'text'
  );
  const [outputFormat, setOutputFormat] = useLocalStorage<OutputFormat>(
    'outputFormat',
    'text'
  );
  const [generationFormat, setGenerationFormat] = useLocalStorage<GenerationFormat>(
    'generationFormat',
    'commands'
  );
  const [linesPerPage, setLinesPerPage] = useLocalStorage('linesPerPage', 14);
  const [minecraftVersion, setMinecraftVersion] = useLocalStorage<MinecraftVersion>(
    'minecraftVersion',
    'java'
  );
  const [javaVersion, setJavaVersion] = useLocalStorage<JavaVersion>(
    'javaVersion',
    '1.20.5'
  );
  const [commandTarget, setCommandTarget] = useLocalStorage<CommandTarget>(
    'commandTarget',
    'commandblock'
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    showResults(
      text,
      title,
      author,
      minecraftVersion,
      generationFormat,
      javaVersion,
      linesPerPage,
      nameSuffix,
      commandTarget
    );
  };

  return {
    inputFormat,
    setInputFormat,
    outputFormat,
    setOutputFormat,
    generationFormat,
    setGenerationFormat,
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
    javaVersion,
    setJavaVersion,
    commandTarget,
    setCommandTarget,
    handleSubmit,
  };
}
