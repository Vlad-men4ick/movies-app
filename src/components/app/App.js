import MovieCardList from '../movie-card-list/MovieCardList';
import {
  service_API,
  getGenres,
  getMovieByName,
  newGuestSession,
  rateMovie,
  getRatedMovies,
} from '../movie-db-api/movie-db-api';
import Spinner from '../spinner/spinner';
import Header from '../header/Header';
import { GenresProvider } from '../gener-context/GetGenerateContext';
import { Pagination } from 'antd';
import { Component } from 'react';

import './App.css';

export default class App extends Component {
  static noMoviesFoundText = () => <span className="no-movies-span">Nothing found on your request</span>;

  state = {
    loading: true,
    // eslint-disable-next-line react/no-unused-state
    error: false,
    movieList: [],
    mode: 'search',
    guestToken: '',
    page: 1,
    totalResults: 0,
    noMoviesFound: false,
    allGenres: {
      genres: [{ id: 1, name: '' }],
    },
  };

  componentDidMount() {
    const { page } = this.state;
    newGuestSession().then((sessionID) => {
      this.setState({
        guestToken: sessionID.guest_session_id,
      });
    });
    service_API(page)
      .then((res) =>
        this.setState({
          movieList: res.results,
          loading: false,
          totalResults: res.total_pages,
        })
      )
      .catch(() => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          error: true,
        });
      });
    getGenres().then((res) => {
      this.setState({
        allGenres: res,
      });
    });
  }

  // выбор режима поиск или rate в компоненте Header
  changeMode = (value) => {
    const { guestToken, page } = this.state;
    this.setState({ mode: value });
    if (value === 'rated') {
      getRatedMovies(guestToken).then(({ results }) => {
        this.setState({
          movieList: results,
        });
      });
    } else {
      this.changePage(page);
    }
  };

  changePage = (page) => {
    this.setState({
      page,
      loading: true,
    });

    service_API(page).then((res) =>
      this.setState({
        movieList: res.results,
        loading: false,
      })
    );
  };

  onSearchMovieName = (movieName) => {
    const { page } = this.state;
    if (!movieName) {
      this.setState({
        noMoviesFound: false,
      });
      this.changePage(page);
    }
    getMovieByName(movieName)
      .then((data) => {
        if (data.results.length === 0) {
          this.setState({
            noMoviesFound: true,
          });
        } else {
          this.setState({
            noMoviesFound: false,
          });
        }
        this.setState({
          movieList: data.results,
        });
      })
      .catch(() => {
        console.log('problem');
      });
  };

  onRateMovie = (rateValue, id) => {
    const { guestToken } = this.state;
    return rateMovie(id, rateValue, guestToken);
  };

  render() {
    const { movieList, loading, mode, allGenres, noMoviesFound, totalResults } = this.state;
    // eslint-disable-next-line no-nested-ternary
    const content = loading ? (
      <Spinner />
    ) : noMoviesFound ? (
      <this.noMoviesFoundText />
    ) : (
      <MovieCardList
        movieList={movieList}
        getRateValue={(id, rateValue) => this.onRateMovie(rateValue, id)}
        forGenres={[]}
      />
    );
    return (
      <section className="wrapper">
        <GenresProvider value={allGenres}>
          <Header
            mode={mode}
            onMode={(value) => this.changeMode(value)}
            getMovieName={(movieName) => {
              this.onSearchMovieName(movieName);
            }}
          />
          {content}
          {mode === 'search' ? (
            <Pagination
              className="pagination"
              onChange={(page) => this.changePage(page)}
              pageSize={20}
              total={totalResults}
              showSizeChanger={false}
            />
          ) : null}
        </GenresProvider>
      </section>
    );
  }
}
