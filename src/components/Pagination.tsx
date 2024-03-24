type Props = {
    onPrevious: () => void;
    onNext: () => void;
    visible: boolean;
    page: number;
};

function Pagination(props: Props) {
  return (
    <div className="mt-2" style={{display: props.visible ? 'block' : 'none'}}>
      <button className='bg-blue-500 rounded p-1 text-white font-bold mr-2' onClick={props.onPrevious}>←</button>
      <span className='bg-gray-300 p-2 rounded'>{props.page}</span>
      <button className='bg-blue-500 rounded p-1 text-white font-bold ml-2' onClick={props.onNext}>→</button>
    </div>
  );
}

export default Pagination;
