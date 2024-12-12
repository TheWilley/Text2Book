import { ReactNode, useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  element: ReactNode;
}

function Tabs(props: { name: string; items: TabItem[]; disabled: boolean }) {
  // State to track the currently active tab
  const [activeId, setActiveId] = useState(props.items[0]?.id);

  return (
    <div
      style={{
        maxHeight: props.disabled ? '0px' : '999px',
        opacity: props.disabled ? '0%' : '100%',
      }}
      className='overflow-hidden transition-all ease-in-out duration-300'
    >
      {/* Tab Buttons */}
      <div className='grid w-full grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2'>
        {props.items.map((item) => (
          <div key={item.id}>
            {/* Hidden Radio Button */}
            <input
              type='radio'
              name={props.name}
              id={item.id}
              className='peer hidden'
              checked={activeId === item.id}
              onChange={() => setActiveId(item.id)}
              disabled={props.disabled}
            />
            {/* Label acting as the tab button */}
            <label
              htmlFor={item.id}
              className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className='mt-4'>
        {props.items.map((item) => (
          <div
            key={item.id}
            style={{
              display: item.id === activeId ? 'block' : 'none',
            }}
          >
            {item.element}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
