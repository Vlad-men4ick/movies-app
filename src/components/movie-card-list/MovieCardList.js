import MovieCard from '../movie-card/MovieCard';
// import PaginationRate from '../pagination-rate/PaginationRate';
import PropTypes from 'prop-types';

import './MovieCardList.css';

function MovieList({ movieList, guestToken, getRateValue }) {
  const leftMovieList = movieList.map((movieItem) => (
    <MovieCard
      key={movieItem.id}
      genreIds={movieItem.genre_ids}
      id={movieItem.id}
      movieTitle={movieItem.original_title}
      date={movieItem.release_date}
      description={movieItem.overview}
      imgPath={movieItem.poster_path}
      voteAverage={movieItem.vote_average}
      rating={movieItem.rating}
      guestToken={guestToken}
      getRateValue={(id, value) => {
        getRateValue(value, id);
      }}
    />
  ));
  // const pagination = () => {
  //   const arrSessionStorage = sessionStorage.length;
  //   console.log(arrSessionStorage);
  // };
  return (
    <>
      <ul className="movie-list">{leftMovieList}</ul>
      {/* <PaginationRate paginationTotal={pagination()} /> */}
    </>
  );
}

export default MovieList;

MovieList.defaultProps = {
  movieList: [],
  guestToken: '',
};

MovieList.propType = {
  movieList: PropTypes.shape(),
  guestToken: PropTypes.string,
};
