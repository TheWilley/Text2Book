import useApp from '../hooks/useApp.ts';
import FormDebug from '../components/formdebug/FormDebug.tsx';
import useDebug from '../hooks/useDebug.ts';

function Debug() {
  const { results, showResults } = useApp();
  useDebug(results);

  return (
    <>
      <div className='text-red-600 bg-gray-200 rounded mb-2 p-2'>
        OBS: This is a debugging page used for validating the output of this app. Clicking
        the "Generate" button will download a JSON file which is used as an input
        parameter when running tests. For more info, please have a look at the{' '}
        <a
          href='https://github.com/TheWilley/Text2Book/blob/master/test/testing.md'
          className='underline'
        >
          testing methodology
        </a>
        .
      </div>
      <FormDebug showResults={showResults} />
    </>
  );
}

export default Debug;
