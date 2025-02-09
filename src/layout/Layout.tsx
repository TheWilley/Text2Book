import Footer from './Footer';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

function Layout(props: Props) {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center bg-white'>
        <div className='max-w-3xl w-full bg-gray-100 p-6 rounded-lg shadow-md'>
          {props.children}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
