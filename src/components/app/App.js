import MovieCardList from '../movie-card-list/MovieCardList';
import MovieDBapi from '../../movie-db-api';
import Spinner from '../spinner/spinner';
import ErrorEducation from '../error-education/ErrorEducation';
import { Component } from 'react';

import './App.css';

export default class App extends Component {
  movieDBApi = new MovieDBapi();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      movieList: [],
      page: 1,
    };
  }

  componentDidMount() {
    for (let i = 1; i < 30; i += 1) {
      this.getMovies(i);
    }
  }

  getMovies(id) {
    this.movieDBApi
      .getMovie(id)
      .then((data) => {
        if (data.backdrop_path != null) {
          this.setState(({ movieList }) => {
            const newArr = [...movieList, data];
            return {
              movieList: newArr,
              loading: false,
              error: false,
            };
          });
        }
      })
      .catch(() => this.onError);
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  render() {
    const { movieList, page, loading, error } = this.state; // this.state.movieList

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorEducation /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <MovieCardList movieList={movieList} page={page} /> : null; // нужно подправить логику

    return (
      <section className="wrapper">
        {errorMessage}
        {spinner}
        {content}
      </section>
    );
  }
}
