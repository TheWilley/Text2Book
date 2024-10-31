import React from 'react';

type Props = {
  text: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  children?: React.ReactNode;
};

function Hint(props: Props) {
  // Set default position to 'top-left' if not provided
  const position = props.position || 'top-left';

  const hintStyle = {
    position: 'absolute' as const,
    ...(position === 'top-left' && { top: -7, left: -7 }),
    ...(position === 'top-right' && { top: 0, right: 0 }),
    ...(position === 'bottom-left' && { bottom: 0, left: 0 }),
    ...(position === 'bottom-right' && { bottom: 0, right: 0 }),
  };

  // Ensure the parent container has relative positioning
  return (
    <div style={{ position: 'relative' }} className='hint'>
      {props.children}
      <div style={hintStyle}>
        <div className='relative group'>
          <div className='w-5 h-5 rounded-full bg-gray-800 text-white flex justify-center items-center cursor-help opacity-40 hover:opacity-100 transition-opacity'>
            {' '}
            ?{' '}
          </div>
          <span className='absolute left-1/2 transform -translate-x-1/2 top-7 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 transition-transform ease-in-out'>
            {props.text}
            <span className='absolute left-1/2 transform -translate-x-1/2 -translate-y-10 top-full mt-1 w-2 h-2 bg-gray-800 rotate-45'></span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Hint;
