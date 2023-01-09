import MovieCardList from '../movie-card-list/MovieCardList';
import MovieDBapi from '../../movie-db-api';
import { Component } from 'react';

import './App.css';

export default class App extends Component {
  movieDBApi = new MovieDBapi();

  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
    };
  }

  componentDidMount() {
    for (let i = 1; i < 30; i += 1) {
      this.getMovies(i);
    }
  }

  getMovies(id) {
    this.movieDBApi.getMovie(id).then((data) => {
      if (data.backdrop_path != null) {
        this.setState(({ movieList }) => {
          const newArr = [...movieList, data];
          return {
            movieList: newArr,
          };
        });
      }
    });
  }

  render() {
    const { movieList } = this.state; // this.state.movieList
    return (
      <section className="wrapper">
        <MovieCardList movieList={movieList} />
      </section>
    );
  }
}
