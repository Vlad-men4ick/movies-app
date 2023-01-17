import './MovieCard.css';
import { GenresConsumer } from '../gener-context/GetGenerateContext';
import { format } from 'date-fns';
import { Rate } from 'antd';
import { Component } from 'react';

export default class MovieCard extends Component {
  state = {
    rate: 0,
  };

  keyForGenre = 1;

  MoviePoster = () => {
    const { imgPath, movieTitle } = this.props;
    return <img src={`https://image.tmdb.org/t/p/original/${imgPath}`} alt={movieTitle} />;
  };

  NoPosterDiv = () => {
    <div className="no-poster">
      <h1>
        {' '}
        NO <br />
        POSTER
      </h1>
    </div>;
  };

  updateGenres = ({ genreIds }) => {
    <GenresConsumer>
      {({ genres }) => {
        if (genres === undefined || genres === null) return null;
        console.log(genres);
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
    </GenresConsumer>;
  };

  PremiereSpan = ({ date }) => (
    <>
      {format(new Date(date), 'd')} {format(new Date(date), 'LLLL')}, {date.slice(0, 4)}
    </>
  );

  render() {
    const { imgPath, voteAverage, movieTitle, description, date, getRateValue, id } = this.props;
    const ItemImg = () => (imgPath ? this.MoviePoster(this.props) : this.NoPosterDiv());

    const rateStyle = (a) => ({
      border: '2px solid',
      width: '30px',
      height: '30px',
      borderRadius: '100%',
      borderColor: borderColor(a),
    });

    // eslint-disable-next-line consistent-return
    function borderColor(a) {
      if (a >= 0 && a <= 3) {
        return '#E90000';
      }
      if (a >= 3 && a < 5) {
        return '#E97E00';
      }
      if (a >= 5 && a < 7) {
        return '#E9D100';
      }
      if (a >= 7 && a < 10) {
        return '#66E900';
      }
    }

    const putValue = () => {
      const { rating } = this.props;
      const { rate } = this.state;
      const defaultValue = rating || rate;
      return defaultValue;
    };
    return (
      <li className="movie-item">
        <div className="item-rate" style={rateStyle(voteAverage)}>
          <span className="item-rate-value">{voteAverage.toFixed(1)}</span>
        </div>
        <div className="item-img">
          <ItemImg />
        </div>
        <div className="item-content">
          <h2 className="item-title">{movieTitle}</h2>
          {date ? this.PremiereSpan(this.props) : null}
          <div className="item-genres">{this.updateGenres(this.props)}</div>
          <p className="item-description">{description}</p>
          <Rate
            className="item-stars-rate"
            value={putValue()}
            onChange={(rateValue) => {
              console.log(rateValue, id);
              getRateValue(rateValue, id);
              this.setState({ rate: rateValue });
            }}
            allowHalf
            count={10}
          />
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
