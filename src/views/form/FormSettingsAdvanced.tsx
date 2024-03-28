import TextInput from '../../components/TextInput.tsx';
import Accordion from '../../components/Accordion.tsx';
import { IFormData } from '../../global/types.ts';
import NumberInput from '../../components/NumberInput.tsx';
import Banner from '../../layout/Banner.tsx';

function FormSettingsAdvanced(
  props: Pick<
    IFormData,
    'nameSuffix' | 'setNameSuffix' | 'linesPerPage' | 'setLinesPerPage'
  >
) {
  return (
    <>

      <Accordion id='advanced-settings' label='⚙️ Advanced'>
      <Banner visisble />
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <div className='border bg-gray-300 rounded-xl p-2 relative'>
            <TextInput
              label='Name Suffix'
              id='format'
              placeholder='"n" is replaced with the index number (leave blank for no index)'
              value={props.nameSuffix}
              setter={props.setNameSuffix}
              maxLength={15}
              centerText
            />
          </div>
          <div className='border bg-gray-300 rounded-xl p-2 relative'>
            <NumberInput
              id='lines-per-page'
              label='Number of lines per page'
              placeholder='14'
              setter={props.setLinesPerPage}
              value={props.linesPerPage}
              required
              max={14}
              min={1}
            />
          </div>
        </div>
      </Accordion>
    </>
  );
}

export default FormSettingsAdvanced;
