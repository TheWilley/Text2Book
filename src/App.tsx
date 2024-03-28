import Layout from './layout/Layout.tsx';
import useApp from './hooks/useApp.ts';
import Form from './views/form/Form.tsx';
import Results from './views/Results.tsx';

function App() {
  const {
    results,
    loading,
    fadeinProps,
    timeToGenerate,
    outputFormat,
    setFadeIn,
    showResults,
    setOutputFormat,
  } = useApp();

  return (
    <Layout>
      <Form
        showResults={showResults}
        loading={loading}
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
      />
      <Results
        results={results}
        fadeinProps={fadeinProps}
        timeToGenerate={timeToGenerate}
        setFadeIn={setFadeIn}
        outputFormat={outputFormat}
      />
    </Layout>
  );
}

export default App;
