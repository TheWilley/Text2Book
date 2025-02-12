import { ReactNode } from 'react';

function TextInput(props: {
  label: ReactNode;
  id: string;
  placeholder: string;
  value: string;
  setter: (value: string) => void;
  maxLength: number;
  centerText?: boolean;
  required?: boolean;
}) {
  return (
    <>
      <label htmlFor={props.id} className='block text-gray-700 text-sm font-bold mb-2'>
        {props.label}
      </label>
      <input
        type='text'
        id={props.id}
        placeholder={props.placeholder}
        className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 ${props.centerText ? 'text-center' : ''}`}
        value={props.value}
        onChange={(e) => props.setter(e.target.value)}
        maxLength={props.maxLength}
        required={props.required}
      />
    </>
  );
}

export default TextInput;
