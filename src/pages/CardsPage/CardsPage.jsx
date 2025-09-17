import css from './CardsPage.module.css';
import Container from '../../components/Container/Container';
import Catalog from '../../components/Catalog/Catalog';
import { useEffect } from "react";
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
import LoadMore from '../../components/LoadMore/LoadMore.jsx';
import Loader from '../../components/Loader/Loader.jsx';

const CardsPage = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const loading = useSelector(selectPsychologistsLoading);
  const error = useSelector(selectPsychologistsError);
  const hasMore = useSelector(selectPsychologistsHasMore) ?? false;
  const loadingMore = useSelector(selectPsychologistsLoadingMore);
 const lastKey = useSelector(selectPsychologistsLastKey);



  
// Перший запит
  useEffect(() => {
    
    dispatch(fetchPsychologists({ pageSize: 4 }));
  }, [dispatch]);

  const handleLoadMore = () => {

    if (!hasMore || loadingMore) return;
    dispatch(fetchPsychologists({ pageSize: 4, lastKey }));
  };
  //console.log("psychologists:", psychologists);
  

  
   if (!psychologists) return null;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <section>
      {loadingMore && <Loader loading={loadingMore} />}
      <Container>
        <div className={css.wrapper}>
          <div className={css.catalogPage}>
            <Catalog psychologists={psychologists} />
          </div>

          {!loading && hasMore && (
          <LoadMore handleLoadMore={handleLoadMore} loadingMore={loadingMore}/>
          )}
        </div>
      </Container>
    </section>
  );
};

export default CardsPage;