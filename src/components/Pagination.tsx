type Props = {
  onPrevious: () => void;
  onNext: () => void;
  previousDisabled: boolean;
  nextDisabled: boolean;
  visible: boolean;
  page: number;
};

function Pagination(props: Props) {
  return (
    <div className='mt-2' style={{ display: props.visible ? 'block' : 'none' }}>
      <button
        className={`${props.previousDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} rounded p-1 text-white font-bold mr-2`}
        onClick={props.onPrevious}
        disabled={props.previousDisabled}
      >
        ←
      </button>
      <span className='bg-gray-300 p-2 rounded'>{props.page}</span>
      <button
        className={`${props.nextDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} rounded p-1 text-white font-bold ml-2`}
        onClick={props.onNext}
        disabled={props.nextDisabled}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
