import Layout from './layout/Layout.tsx';
import useApp from './hooks/useApp.ts';
import Form from './views/form/Form.tsx';
import Results from './views/Results.tsx';

function App() {
  const { results, loading, fadeinProps, timeToGenerate, setFadeIn, showResults } = useApp();

  return (
    <Layout>
      <Form showResults={showResults} loading={loading} />
      <Results results={results} fadeinProps={fadeinProps} timeToGenerate={timeToGenerate} setFadeIn={setFadeIn} />
    </Layout>
  );
}

export default App;
