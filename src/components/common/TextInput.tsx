function TextInput(props: {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: any;
  maxLength: number;
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
        className='w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        maxLength={props.maxLength}
        required={props.required}
      />
    </>
  );
}

export default TextInput;
