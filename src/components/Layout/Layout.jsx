import AppBar from '../AppBar/AppBar';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModalMenu from '../ModalMenu/ModalMenu';
import { useMediaQuery } from 'react-responsive';

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const isMobile = useMediaQuery({ maxWidth: 1023 });
const isTabletOrDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    if (!isMobile) {
      setIsModalOpen(false);
    }
  }, [isMobile]);

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
