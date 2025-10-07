import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import css from './AppBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';
import { selectUserName } from '../../redux/authSelector';


const AppBar = ({
  setIsAuthModalOpen,
  setAuthType,
  isOpen,
  setIsModalOpen,
  isMobile,
}) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

 // console.log('user:', userName);

 
  return (
    <>
      <header className={css.header}>
        <Container>
          <div className={css.wrapper}>
            <div className={css.logo}>
              <p className={css.logoText}>
                psychologists.<span>services</span>
              </p>
            </div>
            <div className={css.navigation}>
              <Navigation />
            </div>

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
                    <span className={css.userName}>{userName}</span>
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

            {isMobile && (
              <>
                {!isOpen && (
                  <button
                    className={css.btnBurger}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <svg width={31} height={32} className={css.burgerIcon}>
                      <use href="/icons/sprite.svg#icon-burger"></use>
                    </svg>
                  </button>
                )}
                {isOpen && (
                  <button
                    className={css.btnClose}
                    onClick={() => setIsModalOpen(false)}
                  >
                    <svg className={css.closeIcon}>
                      <use href="/icons/sprite.svg#icon-x"></use>
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </Container>
      </header>
    </>
  );
};

export default AppBar;
