import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {  BackgroundPattern  } from '../components/index.js';


const MainLayout = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#0A0A0F',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <BackgroundPattern />
      
      <Header />
      <main style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ 
          flex: '1', 
          paddingTop: '70px' 
        }}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;