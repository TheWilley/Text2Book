import React from 'react';

type Props = {
  text: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  padding?: number;
  children?: React.ReactNode;
};

function Hint(props: Props) {
  // Set default position to 'top-left' if not provided
  const position = props.position || 'top-left';
  const padding = 0 + (props.padding || 0);

  const hintStyle = {
    position: 'absolute' as const,
    ...(position === 'top-left' && { top: padding, left: padding }),
    ...(position === 'top-right' && { top: padding, right: padding }),
    ...(position === 'bottom-left' && { bottom: padding, left: padding }),
    ...(position === 'bottom-right' && { bottom: padding, right: padding }),
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
          <span className='absolute md:w-32 left-1/2 transform -translate-x-1/2 top-7 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 transition-transform ease-in-out'>
            {props.text}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Hint;
