import MovieCardList from '../movie-card-list/MovieCardList';
import { service_API, getGenres, getMovieByName, newGuestSession, getRatedMovies } from '../movie-db-api/movie-db-api';
import Spinner from '../spinner/spinner';
import EmptyRequest from '../empty-request/EmptyRequest';
import ErrorInducator from '../error-inducator/ErrorInducator';
import Header from '../header/Header';
import { GenresProvider } from '../gener-context/GetGenerateContext';
import PaginationEl from '../pagination-El/PaginationEl';
import { Component } from 'react';

import './App.css';

export default class App extends Component {
  state = {
    loading: true,
    noMoviesFound: false,
    error: false,
    movieList: [],
    mode: 'search',
    guestToken: '',
    page: 1,
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

    this.receivedResponsServiceAPI(page);

    getGenres().then((res) => {
      this.setState({
        allGenres: res,
      });
    });
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  changeMode = (value) => {
    const { guestToken, page } = this.state;
    this.setState({ mode: value });
    if (value === 'rated') {
      getRatedMovies(guestToken)
        .then(({ results }) => {
          this.setState({
            movieList: results,
            loading: true,
          });
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.changePage(page);
    }
  };

  receivedResponsServiceAPI = (page) => {
    service_API(page)
      .then((res) =>
        this.setState({
          movieList: res.results,
          loading: false,
        })
      )
      .catch(() => {
        this.setState({
          noMoviesFound: true,
        });
      });
  };

  changePage = (page) => {
    this.setState({
      page,
      loading: true,
    });
    this.receivedResponsServiceAPI(page);
  };

  onSearchMovieName = (movieName) => {
    const { page } = this.state;
    if (!movieName) {
      this.setState({
        noMoviesFound: false,
      });
      this.changePage(page);
    }
    getMovieByName(movieName).then((data) => {
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
    });
  };

  render() {
    const { movieList, loading, mode, allGenres, noMoviesFound, error, page, guestToken } = this.state;

    const spiner = <Spinner />;
    const movieCardList = (
      <MovieCardList
        guestToken={guestToken}
        loading={loading}
        noMoviesFound={noMoviesFound}
        movieList={movieList}
        forGenres={[]}
      />
    );
    const emptyRequest = <EmptyRequest />;

    const content = () => {
      if (loading) {
        return spiner;
      }
      if (noMoviesFound) {
        return emptyRequest;
      }
      return movieCardList;
    };

    if (error) return <ErrorInducator />;
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
          {content()}
        </GenresProvider>
        <PaginationEl changePage={(currentPage) => this.changePage(currentPage)} page={page} mode={mode} />
      </section>
    );
  }
}
