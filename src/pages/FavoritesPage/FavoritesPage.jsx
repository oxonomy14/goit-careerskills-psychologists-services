import css from './FavoritesPage.module.css';
import Container from '../../components/Container/Container';
import Catalog from '../../components/Catalog/Catalog';
import Dropdown from "../../components/Dropdown/Dropdown";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPsychologists } from '../../redux/realTimeDb.js';
import {
  selectPsychologists,
  selectPsychologistsLoading,
  selectPsychologistsError,
  selectPsychologistsHasMore,
  selectPsychologistsLoadingMore,
  selectPsychologistsLastKey,
} from '../../redux/psychologistsSelector';
import Loader from '../../components/Loader/Loader.jsx';
import LoadMore from '../../components/LoadMore/LoadMore.jsx';
import { selectFavorites } from '../../redux/favoritesSlice';
import { toast } from "react-toastify";

const filterOptions = {
  aToZ: "aToZ",
  zToA: "zToA",
  less10: "less10",
  greater10: "greater10",
  popular: "popular",
  notPopular: "notPopular",
  all: "all",
};

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const loading = useSelector(selectPsychologistsLoading);
  const error = useSelector(selectPsychologistsError);
  const hasMore = useSelector(selectPsychologistsHasMore) ?? false;
  const loadingMore = useSelector(selectPsychologistsLoadingMore);
  const lastKey = useSelector(selectPsychologistsLastKey);
  const favorites = useSelector(selectFavorites);

  const [activeFilter, setActiveFilter] = useState(filterOptions.all);

  // Завантаження психологів при першому рендері
  useEffect(() => {
    if (psychologists.length === 0) {
      dispatch(fetchPsychologists({ pageSize: 4 }));
    }
  }, [dispatch, psychologists.length]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  // Психологи, які обрані
  const favoritePsychologists = psychologists.filter(psych =>
    favorites.includes(psych.id)
  );

  // Фільтрація та сортування обраних психологів
  const filteredFavoritePsychologists = favoritePsychologists
    .filter((p) => {
      switch (activeFilter) {
        case filterOptions.less10: return p.price < 10;
        case filterOptions.greater10: return p.price > 10;
        case filterOptions.popular: return p.rating >= 4;
        case filterOptions.notPopular: return p.rating < 4;
        case filterOptions.all:
        default: return true;
      }
    })
    .sort((a, b) => {
      switch (activeFilter) {
        case filterOptions.aToZ: return (a.name ?? "").localeCompare(b.name ?? "");
        case filterOptions.zToA: return (b.name ?? "").localeCompare(a.name ?? "");
        default: return 0;
      }
    });

  // Визначаємо, чи потрібно показати кнопку Load More
  const showLoadMore = () => {
    if (loading || loadingMore) return false; 
    if (!hasMore) return false; 

    const remainingFavorites = favorites.filter(
      favId => !psychologists.some(psych => psych.id === favId)
    );
    return remainingFavorites.length > 0;
  };

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    dispatch(fetchPsychologists({ pageSize: 4, lastKey }));
  };

  const handleChange = (value) => {
    setActiveFilter(value);
  };

  

  // Якщо немає обраних психологів
  if (favoritePsychologists.length === 0) {
    return (
      <section>
        {loading && <Loader loading={loading} />}
        <Container>
          <div className={css.wrapper}>
            <div className={css.catalogPage}>
              <p className={css.empty}>You don't have any psychologists of your choice</p>
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
          <p className={css.dropDownTitle}>Filters</p>
          <div className={css.dropDown}>
            <Dropdown onChangeFilter={handleChange} />
          </div>
          <div className={css.catalogPage}>
            <Catalog psychologists={filteredFavoritePsychologists} />
          </div>
          {showLoadMore() && (
            <LoadMore
              handleLoadMore={handleLoadMore}
              loadingMore={loadingMore}
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default FavoritesPage;
