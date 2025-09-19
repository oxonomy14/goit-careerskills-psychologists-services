import css from './CardItem.module.css';
import { Link } from 'react-router-dom';
import BtnFavorite from '../BtnFavorite/BtnFavorite';



const CardItem = ({card}) => {

  return (
   
      <div className={css.cardItem}>
        <div className={css.avatar}>
          <img className={css.avatarImg} src={card.avatar_url} alt={card.name} />
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
                <p>Rating: {card.rating}</p>
              </div>
              <svg width={2} height={16} className={css.vLineIcon}>
                <use href="/icons/sprite.svg#icon-vLine"></use>
              </svg>
              <p className={css.infoPrice}>
                Price / 1 hour: <span>{card.price_per_hour}$</span>
              </p>
      
                  <BtnFavorite card={card} />
            </div>
          </div>
          <p className={css.name}>{card.name}</p>
          <ul className={css.list}>
            <li className={css.item}>
              Experience: <span>{card.experience}</span>
            </li>
            <li className={css.item}>
              License: <span>{card.license}</span>
            </li>
            <li className={css.item}>
              Specialization: <span>{card.specialization}</span>
            </li>
            <li className={css.item}>
              Initial_consultation: <span>{card.initial_consultation}</span>
            </li>
          </ul>
          <p className={css.description}>
           {card.about}
          </p>
     <Link className={css.readMore} to={`/cards/${card.id}`}>Read more</Link>
        </div>
      </div>
  
  );
};

export default CardItem;
