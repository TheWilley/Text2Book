import FormSettings from './FormSettings.tsx';
import FormInput from './FormInput.tsx';
import FormSettingsAdvanced from './FormSettingsAdvanced.tsx';
import { IForm } from '../../global/types.ts';

function Form(props: IForm) {
  return (
    <>
      <FormSettings
        inputFormat={props.settings.inputFormat}
        outputFormat={props.settings.outputFormat}
        generationFormat={props.settings.generationFormat}
        minecraftVersion={props.settings.minecraftVersion}
        linesPerPage={props.settings.linesPerPage}
        nameSuffix={props.settings.nameSuffix}
        javaVersion={props.settings.javaVersion}
        commandTarget={props.settings.commandTarget}
        updateField={props.updateField}
      />
      <FormSettingsAdvanced
        nameSuffix={props.settings.nameSuffix}
        linesPerPage={props.settings.linesPerPage}
        updateField={props.updateField}
      />
      <hr className='mb-4 mt-4' />
      <FormInput
        inputFormat={props.settings.inputFormat}
        generationFormat={props.settings.generationFormat}
        minecraftVersion={props.settings.minecraftVersion}
        text={props.settings.text}
        author={props.settings.author}
        title={props.settings.title}
        loading={props.loading}
        handleSubmit={props.handleSubmit}
        updateField={props.updateField}
      />
    </>
  );
}

export default Form;
