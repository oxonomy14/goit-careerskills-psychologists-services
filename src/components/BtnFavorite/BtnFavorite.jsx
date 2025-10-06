import css from './BtnFavorite.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleFavorite, selectFavorites } from '../../redux/favoritesSlice';
import { selectAuthUser } from '../../redux/authSelector'; 
import { useAuthModal } from '../../context/AuthModalContext';

const BtnFavorite = ({ card }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(card.id);
 const { openLoginModal } = useAuthModal(); 
  const user = useSelector(selectAuthUser);

   const handleClick = () => {
    if (!user) return openLoginModal();
    dispatch(toggleFavorite(card.id));
  };

  return (
    <>
      <button
        type="button"
        className={`${css.btnFavorite} ${isFavorite ? css.active : ''}`}
     
      onClick={handleClick}
      >
        <svg width={26} height={22} className={css.favoriteIcon}>
          <use href="/icons/sprite.svg#icon-favorite"></use>
        </svg>
      </button>
    </>
  );
};

export default BtnFavorite;
