import clsx from 'clsx';
import css from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/authSelector'; 
import { NavLink } from 'react-router-dom';

const Navigation = ({onClose}) => {
  const user = useSelector(selectAuthUser); 
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
      {user && (
      <NavLink className={activeLink} onClick={onClose} to="/favorites">
        Favorites
      </NavLink>
)}
    </nav>
  );
};
export default Navigation;
