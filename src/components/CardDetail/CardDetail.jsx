import css from './CardDetail.module.css';
import BtnFavorite from '../BtnFavorite/BtnFavorite';
import Popup from '../Popup/Popup';
import { useState } from 'react';

const CardDetail = ({ cardId, card }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  if (!card) {
    return <p>Психолога з ID {cardId} не знайдено</p>;
  }

  return (
    <>
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
        <p className={css.description}>{card.about}</p>
        <div className={css.review}>
          <ul className={css.reviewList}>
            {card.reviews.map((item)=>(
            <li className={css.reviewItem} key={`${item.reviewer}-${item.comment}`}>
              <div className={css.reviewInfo}>
                <div className={css.avatarReview}><span>{item.reviewer[0]}</span></div>
                <div>
                  <h3 className={css.avatarName}>{item.reviewer}</h3>
                  <div className={css.reviewRate}>
                    <svg width={16} height={16} className={css.reviewStarIcon}>
                      <use href="/icons/sprite.svg#icon-star"></use>
                    </svg>
                    <p className={css.reviewRateTxt}>{item.rating}</p>
                  </div>
                </div>
              </div>
              <p className={css.reviewComment}>{item.comment}</p>
            </li>))}
          </ul>
        </div>
        <button className={css.btnAppointment} type='button'  onClick={() => setIsPopupOpen(true)}>Make an appointment</button>
      </div>
    </div>
    <Popup  isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)} card={card}/>
        </>
  );
};

export default CardDetail;
