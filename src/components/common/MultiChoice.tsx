function MultiChoice(props: {
  name: string;
  items: { id: string; label: string; checked: boolean; callback: () => void }[];
}) {
  return (
    <div
      className={
        'grid w-full grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2'
      }
    >
      {props.items.map((item) => (
        <div>
          <input
            type='radio'
            name={props.name}
            id={item.id}
            className='peer hidden'
            onChange={item.callback}
            checked={item.checked}
          />
          <label
            htmlFor={item.id}
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export default MultiChoice;
