// import React from "react";
import SearchPanel from '../search-panel/SearchPanel';
import './Header.css';

function Header({ mode, onMode, getMovieName }) {
  function changeStyleActive(id) {
    const buttonsNode = document.querySelectorAll('.btn-filter');
    const btnArr = [...buttonsNode];
    btnArr.map((item) => item.classList.remove('active'));
    btnArr[id].classList.add('active'); // переписсать на библиотеку className
  }

  return (
    <div className="header">
      <nav>
        <button
          type="button"
          className="btn btn-filter active"
          // id="1"
          onClick={() => {
            onMode('search');
            changeStyleActive(0);
          }}
        >
          Search
        </button>
        <button
          type="button"
          className="btn btn-filter"
          // id="2"
          onClick={() => {
            onMode('rated');
            changeStyleActive(1);
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

export default Header;
