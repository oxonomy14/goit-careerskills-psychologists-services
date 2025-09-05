import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import css from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.appBar}>
            <div className={css.logo}>
              <img src="/icon/logo.svg" alt="logo" />
            </div>
            <div className={css.navigationWrapper}>
              <Navigation />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default AppBar;
