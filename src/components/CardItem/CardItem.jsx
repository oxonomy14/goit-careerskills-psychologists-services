import css from './CardItem.module.css';
import { Link } from 'react-router-dom';



const CardItem = () => {
  return (
    <>
      <div className={css.cardItem}>
        <div className={css.avatar}>
          <img className={css.avatarImg} src="/images/avatar.jpg" alt="" />
          <svg width={14} height={14} className={css.circleIcon}>
            <use href="/icons/sprite.svg#icon-circle"></use>
          </svg>
        </div>
        <div className={css.infoContainer}>
          <div className={css.infoRow}>
            <p className={css.infoLeftBox}>Psychologist</p>
            <div className={css.infoRightBox}>
              <div className={css.infoRating}>
                <svg width={16} height={16} className={css.starIcon}>
                  <use href="/icons/sprite.svg#icon-star"></use>
                </svg>
                <p>Rating: 4.75</p>
              </div>
              <svg width={2} height={16} className={css.vLineIcon}>
                <use href="/icons/sprite.svg#icon-vLine"></use>
              </svg>
              <p className={css.infoPrice}>
                Price / 1 hour: <span>120$</span>
              </p>
              <button type="button" className={css.btnFavorite}>
                <svg width={26} height={22} className={css.favoriteIcon}>
                  <use href="/icons/sprite.svg#icon-favorite"></use>
                </svg>
              </button>
            </div>
          </div>
          <p className={css.name}>Dr. Mark Thompson</p>
          <ul className={css.list}>
            <li className={css.item}>
              Experience: <span>20 years</span>
            </li>
            <li className={css.item}>
              License: <span>Licensed Psychologist (License #54321)</span>
            </li>
            <li className={css.item}>
              Specialization: <span>Relationship Counseling</span>
            </li>
            <li className={css.item}>
              Initial_consultation:{' '}
              <span>Free 60-minute initial consultation</span>
            </li>
          </ul>
          <p className={css.description}>
            Dr. Mark Thompson is a highly experienced and licensed psychologist
            specializing in Relationship Counseling. With 20 years of practice,
            he has helped individuals navigate and improve their relationships,
            leading to better well-being and personal growth. Dr. Thompson is
            known for his expertise and ability to provide invaluable insights
            to his clients. His approach to therapy is tailored to each
            individual's unique needs, ensuring a supportive and effective
            counseling experience.
          </p>
     <Link className={css.readMore}>Read more</Link>
        </div>
      </div>
    </>
  );
};

export default CardItem;
