import css from './Hero.module.css';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className={css.hero}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.info}>
            <h1 className={css.heroTitle}>
              The road to the <span> depths</span> of the human soul
            </h1>
            <p className={css.heroText}>
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
              psychologists.
            </p>
            <div className={css.heroButton}>
              <Link to="/cards" className={css.heroLink}>
                Get started
              </Link>

              <svg width={15} height={17} className={css.arrowUpRightIcon}>
                <use href="/icons/sprite.svg#icon-arrowUpRight"></use>
              </svg>
            </div>
          </div>
          <div className={css.baner}>
            <div className={css.null}></div>
            <div className={css.imgHeroContainer}>
              <img
                className={css.imgHero}
                  srcSet="/images/imgMain-desk@1x.webp 1x, /images/imgMain-desk@2x.webp 2x"
                src="/images/imgMain-desk@1x.webp"
                alt="psychologists services"
              />                       
            </div>
            <div className={css.infoBaner}>
              <div className={css.svgBoxInfoBaner}>
                <svg width={20} height={15} className={css.checkIcon}>
                  <use href="/icons/sprite.svg#icon-feCheck"></use>
                </svg>
              </div>

              <div>
                <p className={css.infoBanerText}>Experienced psychologists</p>
                <p className={css.infoBanerText2}>15,000</p>
              </div>
            </div>
            <div className={css.svgBoxQ}>
              <svg width={10} height={15} className={css.questionIcon}>
                <use href="/icons/sprite.svg#icon-question"></use>
              </svg>
            </div>
            <div className={css.svgBoxP}>
              <svg width={25} height={25} className={css.peopleIcon}>
                <use href="/icons/sprite.svg#icon-people"></use>
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
