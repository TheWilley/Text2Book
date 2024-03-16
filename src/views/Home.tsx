import styles from '../css/fadein.module.css';
import Form from '../components/form/Form.tsx';
import Results from '../components/Results.tsx';
import useApp from '../hooks/useApp.ts';

// TODO: Seperate code into components and files, this is MESSY
function Home() {
  const { results, showResults, allowedProps, setFadeIn } = useApp();

  return (
    <>
      <Form showResults={showResults} />
      <div className='mt-3'>
        <ol
          className={`list-decimal ${styles.fadein}`}
          onAnimationEnd={() => setFadeIn(0)}
          {...allowedProps}
        >
          <Results results={results} />
        </ol>
      </div>
    </>
  );
}

export default Home;
