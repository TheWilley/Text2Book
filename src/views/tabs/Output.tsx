import Tabs from '../../components/Tabs';
import UnsupportedCharacters from './UnsupportedCharacters';
import Results from './Results';
import { OutputProps } from '../../global/types';

function Output(props: OutputProps) {
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
