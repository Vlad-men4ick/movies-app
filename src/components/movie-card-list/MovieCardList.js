import MovieCard from '../movie-card/MovieCard';

import './MovieCardList.css';

function MovieList({ movieList, page }) {
  const leftMovieList = movieList.map((movieItem) => (
    <MovieCard
      key={movieItem.id}
      movieTitle={movieItem.original_title}
      date={movieItem.release_date}
      genres={movieItem.genres}
      description={movieItem.overview}
      imgPath={movieItem.poster_path}
    />
  ));

  return <ul className="movieList">{leftMovieList.slice(0 + page * 6, 6 + page * 6)}</ul>;
}

export default MovieList;
