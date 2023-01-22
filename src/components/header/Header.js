import SearchPanel from '../search-panel/SearchPanel';
import './Header.css';
import { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// function Header({ mode, onMode, getMovieName }) {
//   // const className = classNames('', { completed: done });

//   // function changeStyleActive(id) {
//   //   const buttonsNode = document.querySelectorAll('.btn-filter');
//   //   const btnArr = [...buttonsNode];
//   //   btnArr.map((item) => item.classList.remove('active'));
//   //   btnArr[id].classList.add('active'); // переписсать на библиотеку className
//   // }
//   return (
//     <div className="header">
//       <nav>
//         {/* {button} */}
//         <button
//           type="button"
//           id="1"
//           className="btn btn-filter active"
//           onClick={() => {
//             onMode('search');
//             // changeStyleActive(0);
//           }}
//         >
//           Search
//         </button>
//         <button
//           type="button"
//           id="2"
//           className="btn btn-filter"
//           onClick={() => {
//             onMode('rated');
//             // changeStyleActive(1);
//           }}
//         >
//           Rated
//         </button>
//       </nav>
//       {mode === 'search' ? (
//         <SearchPanel
//           getMovieName={(movieName) => {
//             getMovieName(movieName);
//           }}
//         />
//       ) : null}
//     </div>
//   );
// }

// export default Header;

export default class Header extends Component {
  state = {
    search: true,
    retad: false,
  };

  static defaultProps = {
    mode: 'search',
    onMode: () => {},
    getMovieName: () => {},
  };

  static propTypes = {
    getMovieName: PropTypes.func,
    onMode: PropTypes.func,
    mode: PropTypes.string,
  };

  // changeStyleActive = (id) => {
  //   const buttonsNode = document.querySelectorAll('.btn-filter');
  //   const btnArr = [...buttonsNode];
  //   console.log(btnArr);
  //   btnArr.map((item) => item.classList.remove('active'));
  //   btnArr[id].classList.add('active'); // переписсать на библиотеку className
  // };

  render() {
    const { mode, onMode, getMovieName } = this.props;
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
        {mode === 'search' ? (
          <SearchPanel
            getMovieName={(movieName) => {
              getMovieName(movieName);
            }}
          />
        ) : null}
      </div>
    );
  }
}
