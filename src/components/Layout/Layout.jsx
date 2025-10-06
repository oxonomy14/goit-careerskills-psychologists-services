import AppBar from '../AppBar/AppBar';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModalMenu from '../ModalMenu/ModalMenu';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { selectPsychologistsLoading } from '../../redux/psychologistsSelector';
import Loader from '../Loader/Loader';
import AuthModal from '../AuthModal/AuthModal';
import { AuthModalContext } from '../../context/AuthModalContext';


const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const isTabletOrDesktop = useMediaQuery({ minWidth: 1024 });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState("login"); 

  const loading = useSelector(selectPsychologistsLoading);

  const location = useLocation();


  useEffect(() => {
  if (!isMobile) setIsModalOpen(false);

  document.body.style.backgroundColor =
    location.pathname === '/' ? '#fbfbfb' : '#f3f3f3';

}, [isMobile, location.pathname]);

  const openLoginModal = () => {
    setAuthType('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthType('register');
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <AuthModalContext.Provider value={{ openLoginModal, openRegisterModal }}>
      <header>
        <AppBar
          setIsModalOpen={setIsModalOpen}
          isOpen={isModalOpen}
          isMobile={isMobile}
          setIsAuthModalOpen={setIsAuthModalOpen}
          setAuthType={setAuthType}
        />
      </header>

      <main>
        <Loader loading={loading} />
        {isTabletOrDesktop && <Outlet />}

        {isMobile && !isModalOpen && <Outlet />}
        {isMobile && isModalOpen && (
          <ModalMenu
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        {/* одне модальне вікно для Login + Registration */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        authType={authType}  
     
      />
      </main>
      </AuthModalContext.Provider>
    </>
  );
};

export default Layout;
