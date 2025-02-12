import { ReactNode } from 'react';

function RadioInput(props: {
  id: string;
  label: ReactNode;
  name?: string;
  checked: boolean;
  callback: () => void;
}) {
  return (
    <div>
      <input
        type='checkbox'
        name={props.name || props.id}
        id={props.id}
        className='peer hidden'
        onChange={props.callback}
        checked={props.checked}
      />
      <label
        htmlFor={props.id}
        className='block cursor-pointer select-none rounded-xl p-2 text-center bg-red-500 peer-checked:bg-green-500 peer-checked:font-bold text-white peer-checked:hover:bg-green-600 hover:bg-red-600 transition mb-3'
      >
        {props.label}
      </label>
    </div>
  );
}

export default RadioInput;
