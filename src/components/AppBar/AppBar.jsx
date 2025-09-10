import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import css from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.wrapper}>
      
            <div className={css.logo}>
           <p className={css.logoText}>psychologists.<span>services</span></p>
            </div>
            <div className={css.navigation}>
              <Navigation />
            </div>
            <div className={css.registration}>
              <button className={css.btnLogin}>Log In</button>
              <button className={css.btnRegistration}>Registration</button>
            </div>
          </div>

      </Container>
    </header>
  );
};

export default AppBar;
