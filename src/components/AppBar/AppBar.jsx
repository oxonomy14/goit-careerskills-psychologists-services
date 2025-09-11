import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import css from './AppBar.module.css';

const AppBar = () => {
  return (
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
            <button className={css.btnLogin}>Log In</button>
            <button className={css.btnRegistration}>Registration</button>
          </div>
          <button className={css.btnBurger}>
            <svg width={31} height={32} className={css.burgerIcon}>
              <use href="/icons/sprite.svg#icon-burger"></use>
            </svg>
          </button>
        </div>
      </Container>
    </header>
  );
};

export default AppBar;
