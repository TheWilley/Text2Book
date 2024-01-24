import RadioInput from '../common/RadioInput.tsx';
import TextInput from '../common/TextInput.tsx';
import Accordion from '../common/Accordion.tsx';
import { FormData } from '../../global/types.ts';

function FormSettingsAdvanced(
  props: Pick<
    FormData,
    'appendIndex' | 'setAppendIndex' | 'appendIndexFormat' | 'setAppendIndexFormat'
  >
) {
  return (
    <>
      <Accordion id='advanced-settings' label='Advanced'>
        <div className='grid grid-cols-2'>
          <div className='border bg-gray-300 rounded-xl p-2'>
            <RadioInput
              id='append-number'
              label='Append number after names'
              checked={props.appendIndex}
              callback={() => props.setAppendIndex(!props.appendIndex)}
            />
            <TextInput
              label='Format'
              id='format'
              placeholder='[n]'
              value={props.appendIndexFormat}
              onChange={props.setAppendIndexFormat}
              maxLength={15}
            />
          </div>
        </div>
      </Accordion>
    </>
  );
}

export default FormSettingsAdvanced;
