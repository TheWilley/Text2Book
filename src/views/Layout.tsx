import Footer from '../components/Footer';

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
