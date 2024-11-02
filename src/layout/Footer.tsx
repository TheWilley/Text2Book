function Footer() {
  return (
    <footer className='fixed bottom-0 p-2 left-0 w-full bg-white z-10'>
      <div className='text-center w-full font-bold'>
        Made with ❤️ by{' '}
        <a
          className='text-blue-700 hover:underline'
          href='https://github.com/TheWilley/text2book'
          target='_blank'
        >
          {' '}
          TheWilley{' '}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
