const Error = () => {
  return (
    <div className='flex h-[calc(100vh-4rem)] items-center justify-center'>
      <div>
        <h1 className='text-3xl'> 404 - This page does not exist</h1>
        <div className='text-md mt-2'>
          Were you looking for the{' '}
          <a href='/' className='underline text-blue-500'>
            home
          </a>{' '}
          or{' '}
          <a href='/#debug' className='underline text-blue-500'>
            debug
          </a>{' '}
          page?
        </div>
      </div>
    </div>
  );
};

export default Error;
