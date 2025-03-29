import Tabs from '../../components/Tabs';
import { IFormData } from '../../global/types';
import { IBookOutput } from '../../global/types';
import UnsupportedCharacters from './UnsupportedCharacters';
import Results from './Results';

type Props = {
  results: IBookOutput;
  setFadeIn: React.Dispatch<React.SetStateAction<number>>;
  fadeinProps: { fadein: number };
  timeToGenerate: number;
} & Pick<IFormData, 'outputFormat'>;

function Output(props: Props) {
  return (
    <div className='mt-2'>
      <Tabs
        disabled={props.results.book.length === 0}
        name='output-tabs'
        items={[
          {
            id: 'result',
            label: 'Result',
            element: (
              <Results
                results={props.results}
                fadeinProps={props.fadeinProps}
                timeToGenerate={props.timeToGenerate}
                setFadeIn={props.setFadeIn}
                outputFormat={props.outputFormat}
              />
            ),
          },
          {
            id: 'unsupportedCharacters',
            label: 'Unsupported Characters',
            element: (
              <UnsupportedCharacters
                unsupportedCharacters={props.results.unsupportedCharacters}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

export default Output;
