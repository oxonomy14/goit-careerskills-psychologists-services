import css from './Hero.module.css';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className={css.hero}>
      <Container>
        <div className={css.wrapper}>
          <h1 className={css.heroTitle}>Campers of your dreams</h1>
          <p className={css.heroText}>
            You can find everything you want in our catalog
          </p>
          <Link to="/catalog" className={css.heroButton}>
            View Now
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
