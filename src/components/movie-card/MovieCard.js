import './MovieCard.css';
import '../rating/Rating.css';
import { GenresConsumer } from '../gener-context/GetGenerateContext';
import Rating from '../rating/Rating';
import { format } from 'date-fns';
import { Component } from 'react';
import truncate from 'lodash.truncate';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class MovieCard extends Component {
  state = {
    valRate: 0,
    windowInnerWidth: window.innerWidth,
  };

  static defaultProps = {
    imgPath: '',
    movieTitle: '',
    voteAverage: 0,
    description: '',
    date: '',
    guestToken: '',
    id: '',
    rating: 0,
    genreIds: [],
  };

  static propTypes = {
    imgPath: PropTypes.string,
    movieTitle: PropTypes.string,
    voteAverage: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    guestToken: PropTypes.string,
    id: PropTypes.number,
    rating: PropTypes.number,
    genreIds: PropTypes.arrayOf(PropTypes.number),
  };

  keyForGenre = 1;

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    const { voteAverage } = this.props;
    this.setState({
      valRate: voteAverage,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { voteAverage } = this.props;
    if (prevState === this.state) {
      this.setState(() => ({ valRate: voteAverage }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.setState(() => ({
      windowInnerWidth: window.innerWidth,
    }));
  };

  trunc = (discript, objOption) => truncate(discript, objOption);

  descriptionFunc = (disc) => {
    const { windowInnerWidth } = this.state;
    if (windowInnerWidth >= 1050) {
      const obj = { length: 300, separator: ' ' };
      return this.trunc(disc, obj);
    }
    if (windowInnerWidth < 1050 && windowInnerWidth >= 800) {
      const obj = { length: 200, separator: ' ' };
      return this.trunc(disc, obj);
    }
    if (windowInnerWidth < 800 && windowInnerWidth >= 750) {
      const obj = { length: 150, separator: ' ' };
      return this.trunc(disc, obj);
    }
    if (windowInnerWidth < 750 && windowInnerWidth >= 736) {
      const obj = { length: 130, separator: ' ' };
      return this.trunc(disc, obj);
    }
    if (windowInnerWidth < 735 && windowInnerWidth >= 670) {
      return disc;
    }
    if (windowInnerWidth < 670 && windowInnerWidth >= 520) {
      const obj = { length: 180, separator: ' ' };
      return this.trunc(disc, obj);
    }
    if (windowInnerWidth < 520 && windowInnerWidth >= 470) {
      const obj = { length: 150, separator: ' ' };
      return this.trunc(disc, obj);
    }
    if (windowInnerWidth < 470 && windowInnerWidth >= 420) {
      const obj = { length: 200, separator: ' ' };
      return this.trunc(disc, obj);
    }
    const obj = { length: 320, separator: ' ' };
    return this.trunc(disc, obj);
  };

  MoviePoster = () => {
    const { imgPath, movieTitle } = this.props;
    return <img src={`https://image.tmdb.org/t/p/original/${imgPath}`} alt={movieTitle} />;
  };

  NoPosterDiv = () => {
    const { movieTitle } = this.props;
    return (
      <div className="no-poster">
        <h1>
          NO <br />
          POSTER
        </h1>
        {movieTitle}
      </div>
    );
  };

  updateGenres = (genreIds) => (
    <GenresConsumer>
      {({ genres }) => {
        if (genres === undefined || genres === null) return null;
        const genresArr = genreIds.map((itemID) => {
          this.keyForGenre++;
          const genreNames = genres.map((obj) => {
            if (obj.id === itemID) {
              return obj.name;
            }
            return null;
          });
          return (
            <span key={this.keyForGenre} className="genre-span">
              {genreNames}
            </span>
          );
        });
        return genresArr;
      }}
    </GenresConsumer>
  );

  PremiereSpan = ({ date }) => (
    <>
      {format(new Date(date), 'd')} {format(new Date(date), 'LLLL')}, {date.slice(0, 4)}
    </>
  );

  render() {
    const { imgPath, voteAverage, movieTitle, description, date, guestToken, id, rating, genreIds } = this.props;
    const { valRate } = this.state;
    const ItemImg = () => (imgPath ? this.MoviePoster(this.props) : this.NoPosterDiv());

    const borderRate = classNames('item-rate', {
      colorRed: valRate >= 0 && valRate <= 3,
      colorOrange: valRate > 3 && valRate <= 5,
      colorYellow: valRate > 5 && valRate <= 7,
      colorGreen: valRate > 7,
    });

    return (
      <li className="movie-item">
        <div className={borderRate}>
          <span className="item-rate-value">{voteAverage.toFixed(1)}</span>
        </div>
        <div className="item-img">
          <ItemImg />
        </div>
        <div className="item-content">
          <h2 className="item-title">{movieTitle}</h2>
          <span className="item-date">{date ? this.PremiereSpan(this.props) : null}</span>
          <div className="item-genres">{this.updateGenres(genreIds)}</div>
          <p className="item-description">
            <span>{this.descriptionFunc(description)}</span>
          </p>
          <Rating className="item-stars-rate" rating={rating} id={id} guestToken={guestToken} />
        </div>
      </li>
    );
  }
}

// function MovieCard1({ movieTitle, date, imgPath, description, voteAverage, rating, getRateValue, id, genreIds }) {

// const { genres } = allGenres

// const rateStyle = {
//   border: '2px solid',
//   width: '30px',
//   height: '30px',
//   borderRadius: '100%',
//   borderColor:
//     voteAverage >= 0 && voteAverage <= 3
//       ? '#E90000'
//       : voteAverage > 3 && voteAverage <= 5
//         ? '#E97E00'
//         : voteAverage > 5 && voteAverage <= 7
//           ? '#E9D100'
//           : voteAverage > 7 && voteAverage <= 10
//             ? '#66E900'
//             : '',
// };

// const PremiereSpan = () => {
//   <span className="item-premiere">
//     {format(new Date(date), 'd')} {format(new Date(date), 'LLLL')}, {premiereYear}
//   </span>
// }

// const MoviePoster = () => {
//   <img src={`https://image.tmdb.org/t/p/original/${imgPath}`} alt={movieTitle} />
// }

// const NoPosterDiv = () => {
//   <div className="no-poster">
//     <h1>   NO <br />
//           POSTER
//     </h1>
//   </div>
// }

// const putDefaultValue = () => {
//   const defaultValue = rating || null
//   return defaultValue
// }

// const premiereYear = date  ? date.slice(0, 4)  : null
// const keyForGenre = 1

// const updateGenres = () => {
//   <GenresConsumer>
//     {
//       ({genres}) => {
//         if (genres === undefined)
//           return null;
//         const genresArr = genreIds.map((itemID) => {
//           keyForGenre++;
//           const genreNames = genres.map((obj) => {
//             if (obj.id === itemID) {
//               return obj.name;
//             }
//             return null;
//           });
//           return (
//             <span key={keyForGenre} className='genre-span'>
//               {genreNames}
//             </span>
//           );
//         });
//         return genresArr;
//       }
//     }
//   </GenresConsumer>
// }

// const genresElement = <li className="item-genres">comedia</li>;
// const onLog = (id) => console.log(id, 'cclick');  //возможно понадобится для отслуживания нажатия
// console.log(keyl);
// const DescriptionFunc = () => description; // функция которая будет сокращать описание
//   const imgSrc = `http://image.tmdb.org/t/p/w500${imgPath}`;
//   return (
//     <li className="movie-item">
//       <div className="item-rate" style= {rateStyle}>
//         {/* <span className="item-rate-value">{voteAverage}</span> */}
//         <span className="item-rate-value">{voteAverage.toFixed(1)}</span>
//       </div>
//       <div className="item-img">
//         <img className="item-img" src={imgSrc} alt={movieTitle} />
//         {imgSrc ? <MoviePoster/> : <NoPosterDiv/>}
//       </div>
//       <div className="item-content">
//         <h2 className="item-title">{movieTitle}</h2>
//         {date ? <PremiereSpan /> : null}
//         {/* <button
//           type="button"
//           onClick={() => {
//             onLog(keyl);//возможно понадобится для отслуживания нажатия
//           }}
//         >
//           click
//         </button> */}
//         {/* <span className="item-premiere">{date}</span> */}
//         {/* <ul className="item-genres"> {genresElement} </ul> */}
//         <div className="item-genres">{updateGenres()}</div>
//         <p className="item-description">{description}</p>
//         <Rate className="item-stars-rate"
//           defaultValue = {putDefaultValue()}
//           onChange={(rateValue)=> getRateValue(rateValue, id)}
//           // allowHalf={true}
//           count={10}
//         />
//       </div>
//     </li>
//   );
// }

// export default MovieCard;
