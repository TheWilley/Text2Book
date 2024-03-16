import { IFormSettings } from '../../global/types.ts';
import FormSettingsAdvanced from './FormSettingsAdvanced.tsx';
import MultiChoice from '../common/MultiChoice.tsx';

function FormSettings(props: IFormSettings) {
  return (
    <>
      <MultiChoice
        name='input-method'
        items={[
          {
            id: 'use-text-input',
            label: 'Text Input',
            checked: props.inputFormat === 'text',
            callback: () => props.setInputFormat('text'),
          },
          {
            id: 'use-file-input',
            label: 'File Input',
            checked: props.inputFormat === 'file',
            callback: () => props.setInputFormat('file'),
          },
        ]}
      />
      <div className='mb-2' />
      <MultiChoice
        name='generation_method'
        items={[
          {
            id: 'use-command-output',
            label: 'Generate Commands',
            checked: props.outputFormat === 'commands',
            callback: () => props.setOutputFormat('commands'),
          },
          {
            id: 'use-text-output',
            label: 'Generate Text',
            checked: props.outputFormat === 'text',
            callback: () => props.setOutputFormat('text'),
          },
        ]}
      />
      {props.outputFormat === 'commands' && (
        <>
          <div className='mb-2' />
          <MultiChoice
            name='minecraft-version'
            items={[
              {
                id: 'bedrock',
                label: 'Bedrock Version',
                checked: props.minecraftVersion === 'bedrock',
                callback: () => props.setMinecraftVersion('bedrock'),
              },
              {
                id: 'java',
                label: 'Java Version',
                checked: props.minecraftVersion === 'java',
                callback: () => props.setMinecraftVersion('java'),
              },
            ]}
          />
        </>
      )}
      <FormSettingsAdvanced
        appendIndexFormat={props.appendIndexFormat}
        setAppendIndexFormat={props.setAppendIndexFormat}
      />
    </>
  );
}

export default FormSettings;
