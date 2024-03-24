import { IShowResults } from '../../global/types.ts';
import useForm from '../../hooks/useForm.ts';
import FormSettings from './FormSettings.tsx';
import FormInput from './FormInput.tsx';
import FormSettingsAdvanced from './FormSettingsAdvanced.tsx';

function Form(props: { showResults: IShowResults }) {
  const {
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
    loading,
    handleSubmit,
  } = useForm(props.showResults);

  return (
    <>
      <FormSettings
        inputFormat={inputFormat}
        setInputFormat={setInputFormat}
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
        minecraftVersion={minecraftVersion}
        setMinecraftVersion={setMinecraftVersion}
        linesPerPage={linesPerPage}
        setLinesPerPage={setLinesPerPage}
        nameSuffix={nameSuffix}
        setNameSuffix={setNameSuffix}
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
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
        text={text}
        setText={setText}
        author={author}
        setAuthor={setAuthor}
        title={title}
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Form;
