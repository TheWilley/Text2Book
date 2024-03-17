import { useState } from 'react';

function Accordion(props: {
  children: React.ReactNode | React.ReactNode[];
  id: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='grid w-full grid-cols-1 gap-2 rounded-xl bg-gray-200 p-2 mt-2'>
      <input
        type='radio'
        name={props.id}
        id={props.id}
        className='peer hidden'
        checked={open}
        onClick={() => setOpen(!open)}
      />
      <label
        htmlFor={props.id}
        className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
      >
        {props.label}
      </label>
      {open && props.children}
    </div>
  );
}

export default Accordion;
