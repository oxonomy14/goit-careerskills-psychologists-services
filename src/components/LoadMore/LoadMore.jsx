import css from './LoadMore.module.css';

const LoadMore = ({ page, pages, onLoadMore }) => {
  return (
   
      <button
        className={css.btnLoadMore}
        type="button"
        onClick={onLoadMore}
        disabled={page >= pages}
      >
        <span>Load More</span>
      </button>
   
  );
};

export default LoadMore;
