import './MovieCard.css';

function MovieCard({ movieTitle, genres, date, imgPath, description }) {
  const genresElement = genres.map((genreItem) => (
    <li key={genreItem.id} className="genresList__item">
      {genreItem.name}
    </li>
  ));
  const DescriptionFunc = () => description;
  const imgSrc = `http://image.tmdb.org/t/p/w500${imgPath}`;
  return (
    <li className="movieCard">
      <img className="movieImg" src={imgSrc} alt={movieTitle} />
      <div>
        <h2 className="movieTitle">{movieTitle}</h2>
        <span className="releaseDate">{date}</span>
        <ul className="genresList">{genresElement}</ul>
        <p className="description">
          <DescriptionFunc />
        </p>
      </div>
    </li>
  );
}

export default MovieCard;
