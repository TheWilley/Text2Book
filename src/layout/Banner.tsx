type Props = {
  visisble: boolean;
};

function Banner(props: Props) {
  return (
    props.visisble && (
      <div className='w-full bg-red-300 rounded-md p-2'>
        <span>
          ⚠️ Set number of lines to <u>13</u> if words get cut off
        </span>
      </div>
    )
  );
}

export default Banner;
