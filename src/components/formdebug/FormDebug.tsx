import { IShowResults } from '../../global/types.ts';
import useForm from '../../hooks/useForm.ts';
import FormDebugInput from './FormDebugInput.tsx';

function Form(props: { showResults: IShowResults }) {
  const { text, setText, loading, handleSubmit } = useForm(props.showResults);

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

export default Form;
