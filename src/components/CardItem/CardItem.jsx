import css from './CardItem.module.css';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, selectFavorites } from "../../redux/favoritesSlice";



const CardItem = ({item}) => {

  const dispatch = useDispatch();
const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(item.id);


  return (
    <>
      <div className={css.cardItem}>
        <div className={css.avatar}>
          <img className={css.avatarImg} src={item.avatar_url} alt={item.name} />
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
                <p>Rating: {item.rating}</p>
              </div>
              <svg width={2} height={16} className={css.vLineIcon}>
                <use href="/icons/sprite.svg#icon-vLine"></use>
              </svg>
              <p className={css.infoPrice}>
                Price / 1 hour: <span>{item.price_per_hour}$</span>
              </p>
              <button type="button" 
              
               className={`${css.btnFavorite} ${isFavorite ? css.active : ""}`}
              // onClick={toggleFavorite}
              onClick={() => dispatch(toggleFavorite(item.id))}
              >
                <svg width={26} height={22} 
                    className={css.favoriteIcon}
             >
                  <use href="/icons/sprite.svg#icon-favorite"></use>
                </svg>
              </button>
            </div>
          </div>
          <p className={css.name}>{item.name}</p>
          <ul className={css.list}>
            <li className={css.item}>
              Experience: <span>{item.experience}</span>
            </li>
            <li className={css.item}>
              License: <span>{item.license}</span>
            </li>
            <li className={css.item}>
              Specialization: <span>{item.specialization}</span>
            </li>
            <li className={css.item}>
              Initial_consultation: <span>{item.initial_consultation}</span>
            </li>
          </ul>
          <p className={css.description}>
           {item.about}
          </p>
     <Link className={css.readMore}>Read more</Link>
        </div>
      </div>
    </>
  );
};

export default CardItem;
