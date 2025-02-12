import Layout from './layout/Layout.tsx';
import useApp from './hooks/useApp.ts';
import Form from './views/form/Form.tsx';
import Output from './views/top/Output.tsx';
import Changelog from './views/top/Changelog.tsx';
import ImportExport from './views/ImportExport.tsx';

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
      <ImportExport />
      <Changelog />
      <Form
        showResults={showResults}
        loading={loading}
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
      />
      <Output
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
