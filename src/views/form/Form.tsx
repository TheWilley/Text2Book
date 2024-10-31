import { IFormData, IResults } from '../../global/types.ts';
import useForm from '../../hooks/useForm.ts';
import FormSettings from './FormSettings.tsx';
import FormInput from './FormInput.tsx';
import FormSettingsAdvanced from './FormSettingsAdvanced.tsx';

type Props = {
  showResults: IResults;
  loading: boolean;
} & Pick<IFormData, 'outputFormat' | 'setOutputFormat'>;

function Form(props: Props) {
  const {
    inputFormat,
    setInputFormat,
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
    javaVersion,
    setJavaVersion,
    setTitle,
    handleSubmit,
  } = useForm(props.showResults);

  return (
    <>
      <FormSettings
        inputFormat={inputFormat}
        setInputFormat={setInputFormat}
        outputFormat={props.outputFormat}
        setOutputFormat={props.setOutputFormat}
        generationFormat={generationFormat}
        setGenerationFormat={setGenerationFormat}
        minecraftVersion={minecraftVersion}
        setMinecraftVersion={setMinecraftVersion}
        linesPerPage={linesPerPage}
        setLinesPerPage={setLinesPerPage}
        nameSuffix={nameSuffix}
        setNameSuffix={setNameSuffix}
        javaVersion={javaVersion}
        setJavaVersion={setJavaVersion}
      />
      <FormSettingsAdvanced
        nameSuffix={nameSuffix}
        setNameSuffix={setNameSuffix}
        linesPerPage={linesPerPage}
        setLinesPerPage={setLinesPerPage}
      />
      <hr className='mb-4 mt-4' />
      <FormInput
        inputFormat={inputFormat}
        setInputFormat={setInputFormat}
        generationFormat={generationFormat}
        setGenerationFormat={setGenerationFormat}
        text={text}
        setText={setText}
        author={author}
        setAuthor={setAuthor}
        title={title}
        setTitle={setTitle}
        loading={props.loading}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Form;
