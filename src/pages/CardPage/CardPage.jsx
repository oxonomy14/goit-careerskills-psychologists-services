import CardDetail from '../../components/CardDetail/CardDetail';
import GridItem from '../../components/GridItem/GridItem';
import Grid from '../../components/Grid/Grid';
import css from './CardPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPsychologistById } from "../../redux/realTimeDb";
import { selectPsychologists, selectPsychologistsError } from "../../redux/psychologistsSelector";
import Loader from "../../components/Loader/Loader";
import Container from '../../components/Container/Container';

const CardPage = () => {
  const { cardId } = useParams();
  const dispatch = useDispatch();

  

const psychologists = useSelector(selectPsychologists);
  const error = useSelector(selectPsychologistsError);

  useEffect(() => {
    // якщо психолог вже є у state, не потрібно підвантажувати
    const existing = psychologists.find(p => p.id === cardId);
    if (!existing) {
      dispatch(fetchPsychologistById(cardId));
    }
  }, [dispatch, cardId, psychologists]);

  const card = psychologists.find(p => p.id === cardId);

  if (error) return <p>Error: {error}</p>;
  if (!card) return null; // Loader глобальний в Layout показує прогрес

  return (
    <section>
      <Container>
           <div className={css.wrapper}>
                  <div className={css.catalogPage}>
                     <Grid>  
         
          <GridItem key={card.id}>
        <CardDetail card={card} cardId={cardId} />
            </GridItem>
  
      </Grid>
        </div></div>
      </Container>
    </section>
  );
};

export default CardPage;
