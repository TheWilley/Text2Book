import TextInput from '../../components/TextInput.tsx';
import Accordion from '../../components/Accordion.tsx';
import { IFormData } from '../../global/types.ts';
import NumberInput from '../../components/NumberInput.tsx';
import Hint from '../../components/Hint.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function FormSettingsAdvanced(
  props: Pick<
    IFormData,
    'nameSuffix' | 'setNameSuffix' | 'linesPerPage' | 'setLinesPerPage'
  >
) {
  return (
    <>
      <Accordion
        id='advanced-settings'
        label={
          <>
            <FontAwesomeIcon icon={faCog} /> Advanced
          </>
        }
      >
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <div className='border bg-gray-300 rounded-xl p-2 relative'>
            <Hint
              text='The symbol "[n]" will be replaced by the corresponding book number generated. For example, the first book will replace "[n]" with 0, the second book will replace it with 1, and so on. This applies even if only one book is generated.'
              padding={-15}
            >
              <TextInput
                label='Name Suffix'
                id='format'
                placeholder='Enter Suffix'
                value={props.nameSuffix}
                setter={props.setNameSuffix}
                maxLength={15}
                centerText
              />
            </Hint>
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
