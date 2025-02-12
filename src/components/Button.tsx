import { ReactNode } from 'react';

function Button(props: { id: string; label: ReactNode; onclick: () => void }) {
  return (
    <div className='grid w-full grid-cols-1 gap-2 rounded-xl bg-gray-200 p-2 mt-2'>
      <input
        type='button'
        name={props.id}
        id={props.id}
        className='peer hidden'
        onClick={props.onclick}
        readOnly
      />
      <label
        htmlFor={props.id}
        className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
      >
        {props.label}
      </label>
    </div>
  );
}

export default Button;
