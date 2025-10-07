import css from './ModalMenu.module.css';
import Container from '../Container/Container';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';
import { selectUserName } from '../../redux/authSelector';

const ModalMenu = ({ isOpen, onClose, setIsAuthModalOpen,
  setAuthType, }) => {
  if (!isOpen) return null; 
 const dispatch = useDispatch();
  const userName = useSelector(selectUserName);



  return (
    <Container>
      <div className={css.wrapper}>
        <Navigation onClose={onClose} />
        {/* <div className={css.registration}>
          <button className={css.btnLogin}>Log In</button>
          <button className={css.btnRegistration}>Registration</button>
        </div> */}
            <div className={css.registration}>
                      {userName ? (
                        <>
                          <div className={css.person}>
                            <div className={css.iconBoxPerson}>
                            <svg
                              width={24}
                              height={24}
                              className={css.personIcon}
                            >
                              <use href={`/icons/sprite.svg?v=${Date.now()}#icon-person`}></use>
                            </svg>
                            </div>
                            <span  className={css.userName}>{userName}</span>
                            <button
                              className={css.btnLogout}
                              onClick={() => dispatch(logoutUser())}
                            >
                              Logout
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            className={css.btnLogin}
                            onClick={() => {
                              setIsAuthModalOpen(true);
                              setAuthType('login');
                            }}
                          >
                            Log In
                          </button>
                          <button
                            className={css.btnRegistration}
                            onClick={() => {
                              setIsAuthModalOpen(true);
                              setAuthType('register');
                            }}
                          >
                            Registration
                          </button>
                        </>
                      )}
                    </div>
      </div>
    </Container>
  );
};

export default ModalMenu;
