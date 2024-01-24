import { ShowResults } from '../../global/types.ts';
import useForm from '../../hooks/useForm.ts';
import FormSettings from './FormSettings.tsx';
import FormInput from './FormInput.tsx';

function Form(props: { showResults: ShowResults }) {
  const {
    loading,
    outputFormat,
    setOutputFormat,
    inputFormat,
    setInputFormat,
    handleSubmit,
    text,
    setText,
    handleChangeText,
    author,
    handleChangeAuthor,
    title,
    handleChangeTitle,
  } = useForm(props.showResults);

  return (
    <>
      <FormSettings
        inputFormat={inputFormat}
        setInputFormat={setInputFormat}
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
      />
      <hr className='mb-4 mt-4' />
      <FormInput
        setInputFormat={setInputFormat}
        inputFormat={inputFormat}
        setOutputFormat={setOutputFormat}
        outputFormat={outputFormat}
        loading={loading}
        handleSubmit={handleSubmit}
        text={text}
        setText={setText}
        handleChangeText={handleChangeText}
        author={author}
        handleChangeAuthor={handleChangeAuthor}
        title={title}
        handleChangeTitle={handleChangeTitle}
      />
    </>
  );
}

export default Form;
