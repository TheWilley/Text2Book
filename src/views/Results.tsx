import copy from '../assets/copy-icon.png';
import blink from '../css/blink.module.css';
import fadein from '../css/fadein.module.css';
import useResults from '../hooks/useResults.ts';

type Props = {
  results: string[];
  setFadeIn: React.Dispatch<React.SetStateAction<number>>;
  fadeinProps: { fadein: number };
};

function Results(props: Props) {
  const { onAnimationEnd, copyAndNotify, blinkProps, removeCopiedRow, checkRowIsCopied } =
    useResults(props.results);

  return (
    <div className='mt-3'>
      <ol
        className={`list-decimal ${fadein.fadein}`}
        onAnimationEnd={() => props.setFadeIn(0)}
        {...props.fadeinProps}
      >
        {props.results.map((result, index) => (
          <li
            key={index}
            className={`flex rounded border overflow-hidden h-12 mb-1 listitem noblink ${blink.blink} ${blink.noblink}`}
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
        ))}
      </ol>
    </div>
  );
}

export default Results;
