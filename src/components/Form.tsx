import loader from '../assets/loader.svg';
import FileUpload from './FileUpload.tsx';
import { ShowResults } from '../global/types.ts';
import useForm from '../hooks/useForm.ts';
import classNames from 'classnames';

function Form(props: { showResults: ShowResults }) {
  const {
    loading,
    outputFormat,
    setOutputFormat,
    inputFormat,
    setInputFormat,
    handleSubmit,
    text,
    setText,
    handleChangeText,
    author,
    handleChangeAuthor,
    title,
    handleChangeTitle,
  } = useForm(props.showResults);

  // Decides if load icon should be shown
  const ButtonTitle = () => {
    if (loading) {
      return (
        <div className='flex justify-center text-white'>
          <img className='h-5 w-5 mr-3' src={loader} />
        </div>
      );
    } else {
      return 'Generate';
    }
  };

  return (
    <>
      <div className='grid w-full grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2'>
        <div>
          <input
            type='radio'
            name='input_method'
            id='use-text-input'
            className='peer hidden'
            onChange={() => setInputFormat('text')}
            checked={inputFormat === 'text'}
          />
          <label
            htmlFor='use-text-input'
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
          >
            Text Input
          </label>
        </div>
        <div>
          <input
            type='radio'
            name='input_method'
            id='use-file-upload'
            className='peer hidden'
            onChange={() => setInputFormat('file')}
            checked={inputFormat === 'file'}
          />
          <label
            htmlFor='use-file-upload'
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
          >
            File Input
          </label>
        </div>
      </div>
      <div className='grid w-full grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2 mt-2'>
        <div>
          <input
            type='radio'
            name='generation_method'
            id='command-output'
            className='peer hidden'
            onChange={() => setOutputFormat('commands')}
            checked={outputFormat === 'commands'}
          />
          <label
            htmlFor='command-output'
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
          >
            Generate Commands
          </label>
        </div>
        <div>
          <input
            type='radio'
            name='generation_method'
            id='raw-output'
            className='peer hidden'
            onChange={() => setOutputFormat('text')}
            checked={outputFormat === 'text'}
          />
          <label
            htmlFor='raw-output'
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
          >
            Generate Text
          </label>
        </div>
      </div>
      <hr className='mb-4 mt-4' />
      <form onSubmit={handleSubmit}>
        <div
          className={classNames('flex flex-wrap mb-4', {
            hidden: outputFormat === 'text',
          })}
        >
          <div className='w-full sm:w-1/2 px-2'>
            <label
              htmlFor='author'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Author
            </label>
            <input
              type='text'
              id='author'
              placeholder='Lewis Carroll'
              className='w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
              value={author}
              onChange={handleChangeAuthor}
              maxLength={50}
              required
            />
          </div>
          <div className='w-full sm:w-1/2 px-2'>
            <label htmlFor='title' className='block text-gray-700 text-sm font-bold mb-2'>
              Title
            </label>
            <input
              type='text'
              id='title'
              placeholder='Alice in Wonderland'
              className='w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
              value={title}
              onChange={handleChangeTitle}
              maxLength={15}
              required
            />
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='text' className='block text-gray-700 text-sm font-bold mb-2'>
            Text
          </label>
          <div>
            <div className={classNames({ hidden: inputFormat === 'text' })}>
              <FileUpload
                callback={(text) => setText(text)}
                useFileUpload={inputFormat === 'file'}
              />
            </div>
            <div className={classNames({ hidden: inputFormat === 'file' })}>
              <textarea
                id='text'
                placeholder='Once upon a time, there was a girl...'
                className='w-full h-72 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 resize-none'
                value={text}
                onChange={handleChangeText}
                required={inputFormat === 'text'}
              />
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          <ButtonTitle />
        </button>
      </form>
    </>
  );
}

export default Form;
