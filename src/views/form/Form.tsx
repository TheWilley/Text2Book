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
  const { state, updateField, handleSubmit } = useForm(props.showResults);

  return (
    <>
      <FormSettings
        inputFormat={state.inputFormat}
        outputFormat={props.outputFormat}
        setOutputFormat={props.setOutputFormat}
        generationFormat={state.generationFormat}
        minecraftVersion={state.minecraftVersion}
        linesPerPage={state.linesPerPage}
        nameSuffix={state.nameSuffix}
        javaVersion={state.javaVersion}
        commandTarget={state.commandTarget}
        updateField={updateField}
      />
      <FormSettingsAdvanced
        nameSuffix={state.nameSuffix}
        linesPerPage={state.linesPerPage}
        updateField={updateField}
      />
      <hr className='mb-4 mt-4' />
      <FormInput
        inputFormat={state.inputFormat}
        generationFormat={state.generationFormat}
        minecraftVersion={state.minecraftVersion}
        text={state.text}
        author={state.author}
        title={state.title}
        loading={props.loading}
        handleSubmit={handleSubmit}
        updateField={updateField}
      />
    </>
  );
}

export default Form;
