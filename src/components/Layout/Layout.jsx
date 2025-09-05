import AppBar from '../AppBar/AppBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <AppBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
