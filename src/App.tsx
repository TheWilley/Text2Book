import 'react-toastify/dist/ReactToastify.css';
import styles from './css/fadein.module.css';
import Form from './components/Form';
import { ToastContainer } from 'react-toastify';
import Results from './components/Results';
import Footer from './components/Footer';
import useApp from './hooks/useApp.ts';

// TODO: Seperate code into components and files, this is MESSY
function App() {
  const { results, showResults, allowedProps, setFadeIn } = useApp();

  // Creates a toast
  const Toast = () => (
    <ToastContainer
      position='top-right'
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  );

  const Title = () => {
    return (
      <>
        <Toast />
        <div>
          <h1 className='text-5xl font-mono mb-3'> Text2Book </h1>
          <p className='mb-3 text-md'> Text to Minecraft book generator </p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className='flex flex-col items-center bg-white'>
        <Title />
        <div className='max-w-3xl w-full bg-gray-100 p-6 rounded-lg shadow-md'>
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
