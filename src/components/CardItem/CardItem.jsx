import css from './CardItem.module.css';
const CardItem= () => {

    return (
      <>
        <div className={css.cardItem}>
          <div className={css.avatar}><img className={css.avatarImg} src="/images/avatar.jpg" alt="" />
               <svg width={14} height={14} className={css.circleIcon}>
                          <use href="/icons/sprite.svg#icon-circle"></use>
                        </svg>
          </div>
          <div className={css.infoContainer}>
            <div className={css.infoRow}>
                <p className={css.infoLeftBox}>Psychologist</p>
                <div className={css.infoRightBox}>
                     <div className={css.infoRating}>Rating: 4.75</div>
                            <div className={css.infoPrice}>Price / 1 hour: 120$</div>
                            <button type="button" className={css.btnFavorite}>
                                  <svg width={26} height={22} className={css.favoriteIcon}>
                          <use href="/icons/sprite.svg#icon-favorite"></use>
                        </svg> 
                        </button>

                </div>
            </div>
          </div>
        </div>
      </>
    );

}

export default CardItem;