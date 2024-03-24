function NumberInput(props: {
  label: string;
  id: string;
  placeholder: string;
  value: number;
  max: number;
  min: number;
  setter: (value: number) => void;
  required?: boolean;
}) {
  return (
    <>
      <label htmlFor={props.id} className='block text-gray-700 text-sm font-bold mb-2'>
        {props.label}
      </label>
      <input
        type='number'
        max={props.max}
        min={props.min}
        id={props.id}
        placeholder={props.placeholder}
        className='w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 text-center'
        value={props.value ? props.value : ''}
        onChange={(e) => props.setter(parseInt(e.target.value))}
        required={props.required}
      />
    </>
  );
}

export default NumberInput;
