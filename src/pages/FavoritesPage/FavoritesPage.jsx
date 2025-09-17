import css from './FavoritesPage.module.css';
import Container from '../../components/Container/Container';
import Catalog from '../../components/Catalog/Catalog';
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPsychologists } from "../../redux/realTimeDb.js";
import {
  selectPsychologists,
  selectPsychologistsLoading,
  selectPsychologistsError,
  selectPsychologistsHasMore,
  selectPsychologistsLoadingMore,
   selectPsychologistsLastKey
} from "../../redux/psychologistsSelector";
import Loader from '../../components/Loader/Loader.jsx';
import LoadMore from '../../components/LoadMore/LoadMore.jsx';
import { selectFavorites } from "../../redux/favoritesSlice";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const loading = useSelector(selectPsychologistsLoading);
  const error = useSelector(selectPsychologistsError);
   const hasMore = useSelector(selectPsychologistsHasMore) ?? false;
  const loadingMore = useSelector(selectPsychologistsLoadingMore);
   const lastKey = useSelector(selectPsychologistsLastKey);
   const favorites = useSelector(selectFavorites);

useEffect(() => {
    if (psychologists.length === 0) {
      dispatch(fetchPsychologists({ pageSize: 4 }));
    }
  }, [dispatch, psychologists.length]);

  // фільтруємо тільки обраних
  const favoritePsychologists = psychologists.filter(psych =>
    favorites.includes(psych.id)
  );

  // Перевіряємо, чи ще залишились обрані, які ми не підтягнули
  const remainingFavorites = favorites.filter(
    favId => !favoritePsychologists.some(psych => psych.id === favId)
  );

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    dispatch(fetchPsychologists({ pageSize: 4, lastKey }));
  };

  if (error) return <p>Помилка: {error}</p>;

  if (favoritePsychologists.length === 0) {
    return (
      <section>
           {loading && <Loader loading={loading} />}
      <Container>
        <div className={css.wrapper}>
          <div className={css.catalogPage}>
        <p className={css.empty}>У вас немає обраних психологів.</p>
       </div>
        </div>
      </Container>
    </section>
    );
  }

  return (
    <section>
        {loading && <Loader loading={loading} />}
      <Container>
        <div className={css.wrapper}>
          <div className={css.catalogPage}>
            <Catalog psychologists={favoritePsychologists} />
          </div>
         {!loading && hasMore && remainingFavorites.length > 0 && (
          <LoadMore handleLoadMore={handleLoadMore} loadingMore={loadingMore}/>
          )}
        </div>
      </Container>
    </section>
  );
}

export default FavoritesPage;
