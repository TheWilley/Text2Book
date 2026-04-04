import Layout from './layout/Layout.tsx';
import useApp from './hooks/useApp.ts';
import Form from './views/form/Form.tsx';
import Output from './views/tabs/Output.tsx';
import ImportExport from './views/top/ImportExport.tsx';
import useSettings from './hooks/useSettings.ts';

function App() {
  const { results, loading, fadeinProps, timeToGenerate, setFadeIn, showResults } =
    useApp();
  const { state: settings, updateField, handleSubmit } = useSettings(showResults);

  return (
    <Layout>
      <ImportExport />
      <Form
        showResults={showResults}
        loading={loading}
        settings={settings}
        updateField={updateField}
        handleSubmit={handleSubmit}
      />
      <Output
        results={results}
        fadeinProps={fadeinProps}
        timeToGenerate={timeToGenerate}
        setFadeIn={setFadeIn}
        outputFormat={settings.outputFormat}
      />
    </Layout>
  );
}

export default App;
