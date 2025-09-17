import css from './LoadMore.module.css';

const LoadMore = ({ handleLoadMore, loadingMore }) => {
  return (
    <div className={css.LoadMore}>
    <button
      className={css.btnLoadMore}
      onClick={handleLoadMore}
      disabled={loadingMore}
      type='button'
    >
      {loadingMore ? 'Loading...' : 'Load More'}
    </button>
    </div>
  );
};

export default LoadMore;
