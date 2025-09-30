import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/HeaderNew.jsx';
import Footer from '../Footer/Footer.jsx';


const MainLayout = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 100%)'
    }}>
      <Header />
      <main style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column'
      }}>
        <div style={{ 
          flex: '1', 
          paddingTop: '80px' 
        }}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;