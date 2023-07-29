import { useState } from 'react';
import start from './utils/commands';
import 'react-toastify/dist/ReactToastify.css';
import styles from './css/fadein.module.css';
import Form from './components/Form';
import { ToastContainer } from 'react-toastify';
import Results from './components/Results';
import Footer from './components/Footer';

// TODO: Seperate code into components and files, this is MESSY
function App() {
  const [results, setResults] = useState<string[]>([]);
  const [fadeIn, setFadeIn] = useState(0);
  const allowedProps = { fadein: fadeIn };

  // Handle the submit
  const callback = (text: string, author: string, title: string, rawOutput: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setResults(start(text, author, title, rawOutput));
    setFadeIn(1);
    setLoading(false);
  };

  // Creates a toast
  const Toast = () => (
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
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
      <div className="flex flex-col items-center bg-white">
        <Title />
        <div className='max-w-3xl w-full bg-gray-100 p-6 rounded-lg shadow-md'>
          <Form callback={callback} />
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
