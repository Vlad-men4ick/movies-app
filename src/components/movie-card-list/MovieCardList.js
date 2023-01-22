import MovieCard from '../movie-card/MovieCard';
import PropTypes from 'prop-types';

import './MovieCardList.css';

function MovieList({ movieList, guestToken }) {
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
    />
  ));
  return <ul className="movie-list">{leftMovieList}</ul>;
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
