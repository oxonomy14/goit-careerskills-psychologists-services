import css from './CardsPage.module.css';
import Container from '../../components/Container/Container';
import Catalog from '../../components/Catalog/Catalog';
import Dropdown from "../../components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
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


const CardsPage = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const loading = useSelector(selectPsychologistsLoading);
  const error = useSelector(selectPsychologistsError);
  const hasMore = useSelector(selectPsychologistsHasMore) ?? false;
  const loadingMore = useSelector(selectPsychologistsLoadingMore);
 const lastKey = useSelector(selectPsychologistsLastKey);


const [activeFilter, setActiveFilter] = useState(filterOptions.all);
  
// Перший запит
  useEffect(() => {
    
    dispatch(fetchPsychologists({ pageSize: 4 }));
  }, [dispatch]);

  const handleLoadMore = () => {

    if (!hasMore || loadingMore) return;
    dispatch(fetchPsychologists({ pageSize: 4, lastKey }));
  };
  //console.log("psychologists:", psychologists);
  
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

const filteredPsychologists = [...psychologists]
  .filter((p) => {
    switch (activeFilter) {
      case filterOptions.less10:
        return p.price < 10;
      case filterOptions.greater10:
        return p.price > 10;
      case filterOptions.popular:
        return p.rating >= 4;
      case filterOptions.notPopular:
        return p.rating < 4;
      case filterOptions.all:
      default:
        return true;
    }
  })
  .sort((a, b) => {
    switch (activeFilter) {
      case filterOptions.aToZ:
        return (a.name ?? "").localeCompare(b.name ?? "");
      case filterOptions.zToA:
        return (b.name ?? "").localeCompare(a.name ?? "");
      default:
        return 0;
    }
  });

  const handleChange = (value) => {
  setActiveFilter(value);
};

  
   if (!psychologists) return null;


  return (
    <section>
      {loadingMore && <Loader loading={loadingMore} />}
      <Container>
        <div className={css.wrapper}>
          <p className={css.dropDownTitle}>Filters</p>
          <div className={css.dropDown}>
          <Dropdown onChangeFilter={handleChange} />
          </div>
          <div className={css.catalogPage}>
           {filteredPsychologists.length > 0 ? (
          <Catalog psychologists={filteredPsychologists} />
        ) : (
          <p>No psychologists found for the selected filter.</p>
        )}
          </div>

         {!loading && filteredPsychologists.length > 0 && hasMore && (
  <LoadMore handleLoadMore={handleLoadMore} loadingMore={loadingMore} />
)}
        </div>
      </Container>
    </section>
  );
};

export default CardsPage;