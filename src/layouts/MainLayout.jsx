import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { BackgroundPattern } from '../components/index.js';


const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-[#0A0A0F] relative overflow-hidden'>
      <BackgroundPattern />

      <Header />
      <main className='flex-1 flex flex-col relative z-[2]'>
        <div className='flex-1 pt-[70px]'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;