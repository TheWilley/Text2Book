import { IShowResults } from '../../global/types.ts';
import useForm from '../../hooks/useForm.ts';
import FormDebugInput from './FormDebugInput.tsx';
import { useEffect } from 'react';

function FormDebug(props: { showResults: IShowResults }) {
  const { text, setText, setOutputFormat, loading, handleSubmit } = useForm(
    props.showResults
  );

  useEffect(() => {
    // Set output format to text as we don't want to generate a command
    setOutputFormat('text');
  }, []);

  return (
    <>
      <FormDebugInput
        inputFormat='text'
        text={text}
        setText={setText}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default FormDebug;
