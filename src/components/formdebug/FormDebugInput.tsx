import classNames from 'classnames';
import loader from '../../assets/loader.svg';
import { IFormDebugInput } from '../../global/types.ts';
import TextArea from '../common/TextArea.tsx';

function FormDebugInput(props: IFormDebugInput) {
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
      <div className='mb-4'>
        <div className={classNames({ hidden: props.inputFormat === 'file' })}>
          <TextArea
            label='Text'
            id='text'
            placeholder='Once upon a time, there was a girl...'
            value={props.text}
            setter={props.setText}
            required={props.inputFormat === 'text'}
          />
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

export default FormDebugInput;
