import css from './Catalog.module.css';
import GridItem from '../GridItem/GridItem';
import Grid from '../Grid/Grid';
import CardItem from '../CardItem/CardItem';

const Catalog = ({psychologists}) => {

    return (
        <>
            <Grid>  
              {psychologists.map((card)=> (    
          <GridItem key={card.id}>
            <CardItem card={card}/>
          </GridItem>
     ))} 
      </Grid>
        </>
    );

}

export default Catalog;