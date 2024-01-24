import classNames from 'classnames';
import FileUpload from '../FileUpload.tsx';
import loader from '../../assets/loader.svg';
import { FormData } from '../../global/types.ts';

function FormInput(props: FormData) {
  // Decides if load icon should be shown
  const ButtonTitle = () => {
    if (props.loading) {
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
    <form onSubmit={props.handleSubmit}>
      <div
        className={classNames('flex flex-wrap mb-4', {
          hidden: props.outputFormat === 'text',
        })}
      >
        <div className='w-full sm:w-1/2 px-2'>
          <label htmlFor='author' className='block text-gray-700 text-sm font-bold mb-2'>
            Author
          </label>
          <input
            type='text'
            id='author'
            placeholder='Lewis Carroll'
            className='w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
            value={props.author}
            onChange={props.handleChangeAuthor}
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
            value={props.title}
            onChange={props.handleChangeTitle}
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
          <div className={classNames({ hidden: props.inputFormat === 'text' })}>
            <FileUpload
              callback={(text) => props.setText(text)}
              useFileUpload={props.inputFormat === 'file'}
            />
          </div>
          <div className={classNames({ hidden: props.inputFormat === 'file' })}>
            <textarea
              id='text'
              placeholder='Once upon a time, there was a girl...'
              className='w-full h-72 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 resize-none'
              value={props.text}
              onChange={props.handleChangeText}
              required={props.inputFormat === 'text'}
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
  );
}

export default FormInput;
