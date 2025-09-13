
import css from './CardsPage.module.css';
import Container from '../../components/Container/Container';
import Catalog from '../../components/Catalog/Catalog';

const CardsPage = () => {
    return (
        <section>
      {/* <Loader loading={loading} /> */}
      <Container>
        <div className={css.wrapper}>
          <div className={css.catalogPage}>
          
            <Catalog />
          </div>
{/* <div className={css.loadMore}>
           {page < pages && (
        <LoadMore page={page} pages={pages} onLoadMore={handleLoadMore} />
      )}
          </div> */}
        </div>
      </Container>
    </section>
    )
}

export default CardsPage;