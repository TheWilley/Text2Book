import useFileUpload from '../hooks/useFileUpload.ts';

function FileUpload(props: { callback: (text: string) => void; useFileUpload: boolean }) {
  const { fileName, handleFileChange } = useFileUpload(props.callback);

  return (
    <div>
      <div className='relative mb-3'>
        <input
          id='file-upload'
          type='file'
          onChange={handleFileChange}
          accept='.txt'
          className='opacity-0 absolute z-0 w-full h-full'
          required={props.useFileUpload}
        />
        <div className='bg-white rounded-md border border-gray-400 px-4 py-2 flex items-center justify-between'>
          <span className='text-gray-700'>{fileName || 'Choose a file'}</span>
          <button
            type='button'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer'
          >
            Browse
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
