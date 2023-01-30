/* eslint-disable consistent-return */
import MovieCardList from '../movie-card-list/MovieCardList';
import { service_API, getGenres, getMovieByName, newGuestSession, getRatedMovies } from '../../service/movie-db-api';
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
    guestToken: localStorage.getItem('guest'),
    page: 1,
    allGenres: {
      genres: [{ id: 1, name: '' }],
    },
    total: '',
    searchMovieName: '',
  };

  componentDidMount() {
    const { guestToken, page } = this.state;
    if (guestToken === null) {
      newGuestSession()
        .then((sessionID) => {
          this.setState({
            guestToken: this.funcLoccal(sessionID),
          });
        })
        .catch((e) => {
          console.log('problem', e);
          this.setState({
            error: true,
          });
        });
    }

    service_API(page)
      .then((res) =>
        this.setState({
          movieList: res.results,
          loading: false,
          total: res.total_pages,
        })
      )
      .catch((e) => {
        console.log('problem', e);
        this.setState({
          error: true,
        });
      });

    getGenres()
      .then((res) => {
        this.setState({
          allGenres: res,
        });
      })
      .catch((e) => {
        console.log('problem', e);
        this.setState({
          error: true,
        });
      });
  }

  changeMode = (value) => {
    const { guestToken } = this.state;
    this.setState({
      noMoviesFound: false,
      page: 1,
      mode: value,
    });
    if (value === 'rated') {
      getRatedMovies(guestToken, 1)
        .then(({ results, total_pages }) => {
          this.setState({
            searchMovieName: '',
            total: total_pages,
            movieList: results,
            loading: true,
          });
        })
        .catch((e) => {
          console.log('problem', e);
          this.setState({
            error: true,
          });
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    } else if (value === 'search') {
      service_API(1)
        .then((res) =>
          this.setState({
            searchMovieName: '',
            movieList: res.results,
            loading: false,
            total: res.total_pages,
          })
        )
        .catch((e) => {
          console.log('problem', e);
          this.setState({
            error: true,
          });
        });

      getGenres()
        .then((res) => {
          this.setState({
            allGenres: res,
          });
        })
        .catch((e) => {
          console.log('problem', e);
          this.setState({
            error: true,
          });
        });
    } else {
      return null;
    }
  };

  changePage = (pages) => {
    this.setState({
      page: pages,
    });
    const { mode, guestToken, searchMovieName } = this.state;
    if (mode === 'rated') {
      getRatedMovies(guestToken, pages)
        .then(({ results, total_pages }) => {
          this.setState({
            page: pages,
            total: total_pages,
            movieList: results,
            loading: true,
          });
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    } else if (mode === 'search') {
      service_API(pages)
        .then((res) =>
          this.setState({
            movieList: res.results,
            loading: false,
            total: res.total_pages,
          })
        )
        .catch((e) => {
          console.log('problem', e);
          this.setState({
            error: true,
          });
        });

      getGenres()
        .then((res) => {
          this.setState({
            allGenres: res,
          });
        })
        .catch((e) => {
          console.log('propblem', e);
          this.setState({
            error: true,
          });
        });
    } else {
      getMovieByName(searchMovieName, pages)
        .then((data) => {
          this.setState({
            total: data.total_pages,
          });
          if (data.results.length === 0) {
            this.setState({
              noMoviesFound: true,
            });
          } else {
            this.setState({
              total: data.total_pages,
              noMoviesFound: false,
            });
          }
          this.setState({
            movieList: data.results,
          });
        })
        .catch((e) => {
          console.log('propblem', e);
          this.setState({
            error: true,
          });
        });
    }
  };

  onSearchMovieName = (movieName) => {
    this.setState(() => ({ page: 1, searchMovieName: movieName }));
    if (!movieName) {
      this.setState({
        noMoviesFound: false,
      });
      return null;
    }

    getMovieByName(movieName, 1)
      .then((data) => {
        this.setState({
          total: data.total_pages,
        });
        if (data.results.length === 0) {
          this.setState({
            noMoviesFound: true,
          });
        } else {
          this.setState({
            total: data.total_pages,
            noMoviesFound: false,
          });
        }
        this.setState({
          movieList: data.results,
        });
      })
      .catch((e) => {
        console.log('propblem', e);
        this.setState({
          error: true,
        });
      });
  };

  funcLoccal(sessionID) {
    const { guestToken } = this.state;
    if (guestToken === null) {
      localStorage.setItem('guest', sessionID.guest_session_id);
      return sessionID.guest_session_id;
    }
    return sessionID.guest_session_id;
  }

  render() {
    const { movieList, loading, mode, allGenres, noMoviesFound, error, page, guestToken, searchMovieName, total } =
      this.state;
    console.log(this.state);

    const spiner = <Spinner />;
    const movieCardList = (
      <MovieCardList
        guestToken={guestToken}
        loading={loading}
        noMoviesFound={noMoviesFound}
        movieList={movieList}
        forGenres={[]}
        getRateValue={(id, rateValue) => this.onRateMovie(rateValue, id)}
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
            searchMovieName={searchMovieName}
            mode={mode}
            onMode={(value) => {
              this.changeMode(value);
            }}
            getMovieName={(movieName) => {
              this.onSearchMovieName(movieName, page);
            }}
          />
          {content()}
        </GenresProvider>
        <PaginationEl totalResults={total} changePage={(currentPage) => this.changePage(currentPage)} page={page} />
      </section>
    );
  }
}
