import { ShowResults } from '../../global/types.ts';
import useForm from '../../hooks/useForm.ts';
import FormSettings from './FormSettings.tsx';
import FormInput from './FormInput.tsx';

function Form(props: { showResults: ShowResults }) {
  const {
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
        appendIndex={appendIndex}
        setAppendIndex={setAppendIndex}
      />
      <hr className='mb-4 mt-4' />
      <FormInput
        inputFormat={inputFormat}
        setInputFormat={setInputFormat}
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
        text={text}
        setText={setText}
        appendIndex={appendIndex}
        setAppendIndex={setAppendIndex}
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
