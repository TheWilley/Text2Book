import { FormData } from '../../global/types.ts';
import FormSettingsAdvanced from './FormSettingsAdvanced.tsx';

function FormSettings(
  props: Pick<
    FormData,
    'inputFormat' | 'setInputFormat' | 'outputFormat' | 'setOutputFormat'
  >
) {
  return (
    <>
      <div className='grid w-full grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2'>
        <div>
          <input
            type='radio'
            name='input_method'
            id='use-text-input'
            className='peer hidden'
            onChange={() => props.setInputFormat('text')}
            checked={props.inputFormat === 'text'}
          />
          <label
            htmlFor='use-text-input'
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
          >
            Text Input
          </label>
        </div>
        <div>
          <input
            type='radio'
            name='input_method'
            id='use-file-upload'
            className='peer hidden'
            onChange={() => props.setInputFormat('file')}
            checked={props.inputFormat === 'file'}
          />
          <label
            htmlFor='use-file-upload'
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
          >
            File Input
          </label>
        </div>
      </div>
      <div className='grid w-full grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2 mt-2'>
        <div>
          <input
            type='radio'
            name='generation_method'
            id='command-output'
            className='peer hidden'
            onChange={() => props.setOutputFormat('commands')}
            checked={props.outputFormat === 'commands'}
          />
          <label
            htmlFor='command-output'
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
          >
            Generate Commands
          </label>
        </div>
        <div>
          <input
            type='radio'
            name='generation_method'
            id='raw-output'
            className='peer hidden'
            onChange={() => props.setOutputFormat('text')}
            checked={props.outputFormat === 'text'}
          />
          <label
            htmlFor='raw-output'
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
          >
            Generate Text
          </label>
        </div>
      </div>
      <FormSettingsAdvanced />
    </>
  );
}

export default FormSettings;
