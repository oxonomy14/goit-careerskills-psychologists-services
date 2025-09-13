import AppBar from '../AppBar/AppBar';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModalMenu from '../ModalMenu/ModalMenu';
import { useMediaQuery } from 'react-responsive';

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const isMobile = useMediaQuery({ maxWidth: 1023 });
const isTabletOrDesktop = useMediaQuery({ minWidth: 1024 });

  const location = useLocation();

  useEffect(() => {
    if (!isMobile) {
      setIsModalOpen(false);
    }
     switch (location.pathname) {
      case '/':
        document.body.style.backgroundColor = '#fbfbfb'; // головна
        break;
      default:
        document.body.style.backgroundColor = '#f3f3f3';
    }
     return () => {
      document.body.style.backgroundColor = '';
    };
  }, [isMobile, location.pathname]);



  return (
    <>
      <header>
        <AppBar
          setIsModalOpen={setIsModalOpen}
          isOpen={isModalOpen}
          isMobile={isMobile}
        />
      </header>

      <main>
      {isTabletOrDesktop && <Outlet />}

  {isMobile && !isModalOpen && <Outlet />}
  {isMobile && isModalOpen && (
    <ModalMenu
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
  )}
      </main>
    </>
  );
};

export default Layout;
