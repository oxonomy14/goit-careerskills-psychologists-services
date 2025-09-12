import clsx from 'clsx';
import css from './Navigation.module.css';

import { NavLink } from 'react-router-dom';

const Navigation = ({onClose}) => {
  const activeLink = ({ isActive }) => {
    return clsx(css.navMenu, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <NavLink className={activeLink} onClick={onClose} to="/">
        Home
      </NavLink>
      <NavLink className={activeLink} onClick={onClose} to="/cards">
        Psychologists
      </NavLink>
      <NavLink className={activeLink} onClick={onClose} to="/favorites">
        Favorites
      </NavLink>
    </nav>
  );
};
export default Navigation;
