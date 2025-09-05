import clsx from 'clsx';
import css from './Navigation.module.css';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const activeLink = ({ isActive }) => {
    return clsx(css.navMenu, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <NavLink className={activeLink} to="/">
        Home
      </NavLink>
      <NavLink className={activeLink} to="/catalog">
        Catalog
      </NavLink>
    </nav>
  );
};
export default Navigation;
