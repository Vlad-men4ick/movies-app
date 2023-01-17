import MovieCard from '../movie-card/MovieCard';

import './MovieCardList.css';

function MovieList({ movieList, getRateValue }) {
  const leftMovieList = movieList.map((movieItem) => (
    <MovieCard
      key={movieItem.id}
      genreIds={movieItem.genre_ids}
      id={movieItem.id}
      movieTitle={movieItem.original_title}
      date={movieItem.release_date}
      genres={movieItem.genres}
      description={movieItem.overview}
      imgPath={movieItem.poster_path}
      voteAverage={movieItem.vote_average}
      rating={movieItem.rating}
      getRateValue={(id, value) => {
        getRateValue(value, id);
      }}
    />
  ));

  return <ul className="movie-list">{leftMovieList}</ul>;
}

export default MovieList;
