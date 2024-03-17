import Layout from './layout/Layout.tsx';
import useApp from './hooks/useApp.ts';
import Form from './views/form/Form.tsx';
import Results from './views/Results.tsx';

function App() {
  const { results, showResults, fadeinProps, setFadeIn } = useApp();

  return (
    <Layout>
      <Form showResults={showResults} />
      <Results results={results} fadeinProps={fadeinProps} setFadeIn={setFadeIn} />
    </Layout>
  );
}

export default App;
