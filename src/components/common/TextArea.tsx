function TextArea(props: {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  setter: (value: string) => void;
  required?: boolean;
}) {
  return (
    <>
      <label htmlFor={props.id} className='block text-gray-700 text-sm font-bold mb-2'>
        Text
      </label>
      <textarea
        id={props.id}
        placeholder={props.placeholder}
        className='w-full min-h-[58px] h-72 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
        value={props.value}
        onChange={(e) => props.setter(e.target.value)}
        required={props.required}
      />
    </>
  );
}

export default TextArea;
