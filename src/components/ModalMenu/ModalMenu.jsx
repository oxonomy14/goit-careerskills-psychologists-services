import css from './ModalMenu.module.css';
import Container from '../Container/Container';

import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const ModalMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 



  return (
    <Container>
      <div className={css.wrapper}>
        <Navigation onClose={onClose} />
        <div className={css.registration}>
          <button className={css.btnLogin}>Log In</button>
          <button className={css.btnRegistration}>Registration</button>
        </div>
      </div>
    </Container>
  );
};

export default ModalMenu;
