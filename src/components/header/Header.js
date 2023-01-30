/* eslint-disable no-unused-expressions */
import SearchPanel from '../search-panel/SearchPanel';
import './Header.css';
import { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Header extends Component {
  state = {
    search: true,
    retad: false,
  };

  static defaultProps = {
    searchMovieName: '',
    mode: 'search',
    onMode: () => {},
    getMovieName: () => {},
  };

  static propTypes = {
    searchMovieName: PropTypes.string,
    getMovieName: PropTypes.func,
    onMode: PropTypes.func,
    mode: PropTypes.string,
  };

  render() {
    const { mode, onMode, getMovieName, searchMovieName } = this.props;
    const { search, retad } = this.state;
    const classNameSearch = classNames('btn btn-filter', { active: search });
    const classNameRetad = classNames('btn btn-filter', { active: retad });
    return (
      <div className="header">
        <nav>
          <button
            type="button"
            className={classNameSearch}
            onClick={() => {
              onMode('search');
              this.setState({
                retad: false,
                search: true,
              });
            }}
          >
            Search
          </button>
          <button
            type="button"
            className={classNameRetad}
            onClick={() => {
              onMode('rated');
              this.setState({
                search: false,
                retad: true,
              });
            }}
          >
            Rated
          </button>
        </nav>
        {mode !== 'rated' ? (
          <SearchPanel
            mode={mode}
            searchMovieName={searchMovieName}
            getMovieName={(movieName) => {
              getMovieName(movieName);
              if (movieName !== '') {
                onMode('searchByName');
              } else {
                onMode('search');
              }
            }}
          />
        ) : null}
      </div>
    );
  }
}
