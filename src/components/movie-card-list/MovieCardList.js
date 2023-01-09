import MovieCard from '../movie-card/MovieCard';

import './MovieCardList.css';

function MovieList({ movieList }) {
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

  return <ul className="movieList">{leftMovieList}</ul>;
}

export default MovieList;
