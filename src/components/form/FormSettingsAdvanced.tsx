import TextInput from '../common/TextInput.tsx';
import Accordion from '../common/Accordion.tsx';
import { IFormData } from '../../global/types.ts';

function FormSettingsAdvanced(
  props: Pick<IFormData, 'appendIndexFormat' | 'setAppendIndexFormat'>
) {
  return (
    <>
      <Accordion id='advanced-settings' label='Advanced'>
        <div className='grid grid-cols-1'>
          <div className='border bg-gray-300 rounded-xl p-2 relative'>
            <TextInput
              label='Append Index Format'
              id='format'
              placeholder='"n" is replaced with the index number (leave blank for no index)'
              value={props.appendIndexFormat}
              setter={props.setAppendIndexFormat}
              maxLength={15}
              centerText
            />
          </div>
        </div>
      </Accordion>
    </>
  );
}

export default FormSettingsAdvanced;
