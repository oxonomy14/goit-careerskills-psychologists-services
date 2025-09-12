import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import css from './AppBar.module.css';


const AppBar = ({ isOpen, setIsModalOpen, isMobile }) => {
 
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
              <button className={css.btnLogin}>Log In</button>
              <button className={css.btnRegistration}>Registration</button>
            </div> 


            {isMobile && (
              <>
            {!isOpen && (
            <button
              className={css.btnBurger}
              onClick={() => setIsModalOpen(true)}>
              <svg width={31} height={32} className={css.burgerIcon}>
                <use href="/icons/sprite.svg#icon-burger"></use>
              </svg>
            </button>
)}
     {isOpen && (
            <button  className={css.btnClose} onClick={() => setIsModalOpen(false)}>
              <svg  className={css.closeIcon}>
                <use href="/icons/sprite.svg#icon-x"></use>
              </svg>
            </button>
)}
</>)

}
          </div>
        </Container>
      </header>
    </>
  );
};

export default AppBar;
