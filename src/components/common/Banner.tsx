import React from 'react';

type Props = {
  visisble: boolean;
  children: React.ReactNode;
};

function Banner(props: Props) {
  return (
    props.visisble && (
      <div className='w-full bg-red-300 absolute top-0'>{props.children}</div>
    )
  );
}

export default Banner;
