import copy from '../assets/copy-icon.png';
import styles from '../css/blink.module.css';
import useResults from '../hooks/useResults.ts';

function Results(props: { results: string[] }) {
  const { onAnimationEnd, copyAndNotify, blinkProps, removeCopiedRow, checkRowIsCopied } =
    useResults(props.results);

  return props.results.map((result, index) => (
    <li
      key={index}
      className={`flex rounded border overflow-hidden h-12 mb-1 listitem noblink ${styles.blink} ${styles.noblink}`}
      {...blinkProps}
      onAnimationEnd={onAnimationEnd}
    >
      <button
        onClick={(e) => copyAndNotify(e, index, result)}
        className='w-12 bg-gray-300 h-full p-2 border-right group'
      >
        <img className='p-1 group-hover:opacity-70 transition' src={copy} />
      </button>
      <input
        className='w-full p-2 opacity-80 font-mono h-full outline-none'
        type='text'
        value={result}
        readOnly
      />
      <div className='text-xl p-2 bg-gray-300 select-none'>{index + 1}</div>
      {checkRowIsCopied(index) && (
        <div
          className='text-xl p-2 bg-green-300 hover:bg-red-300 select-none cursor-pointer'
          onClick={() => removeCopiedRow(index)}
        >
          ✓
        </div>
      )}
    </li>
  ));
}

export default Results;
