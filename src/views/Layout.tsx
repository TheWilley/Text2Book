import Footer from '../components/Footer';
import Banner from '../components/common/Banner';

type Props = {
  children: React.ReactNode;
};

function Layout(props: Props) {
  const Title = () => {
    return (
      <>
        <div>
          <h1 className='text-5xl font-mono mb-3'> Text2Book </h1>
          <p className='mb-3 text-md'> Text to Minecraft book generator </p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className='flex flex-col items-center bg-white'>
        <Banner visisble>
          <span>
            ⚠️ This is under active development, and may not be 100% accurate. Don't
            worry,{' '}
            <a
              href='https://github.com/TheWilley/Text2Book/issues/10'
              target='_blank'
              className='underline text-blue-800 cursor-pointer'
            >
              I'm working on it.
            </a>
          </span>
        </Banner>
        <Title />
        <div className='max-w-3xl w-full bg-gray-100 p-6 rounded-lg shadow-md'>
          {props.children}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
