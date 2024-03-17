import React from 'react';

type Props = {
  visisble: boolean;
};

function Banner(props: Props) {
  return (
    props.visisble && (
      <div className='w-full bg-red-300 absolute top-0 left-0'>
        <span>
          ⚠️ This is under active development, and may not be 100% accurate. Don't worry,{' '}
          <a
            href='https://github.com/TheWilley/Text2Book/issues/10'
            target='_blank'
            className='underline text-blue-800 cursor-pointer'
          >
            I'm working on it.
          </a>
        </span>
      </div>
    )
  );
}

export default Banner;
