// /* eslint-disable no-return-assign */
// /* eslint-disable react/sort-comp */
// import { Component } from 'react';
// import debounce from 'lodash.debounce';
// import PropTypes from 'prop-types';

// export default class SearchPanel extends Component {
//   static defaultProps = {
//     getMovieName: () => {},
//   };

//   static propTypes = {
//     getMovieName: PropTypes.func,
//   };

//   // eslint-disable-next-line react/sort-comp
//   onLabelChange = (e) => {
//     const { getMovieName } = this.props;
//     console.log('onLabelChange');
//     getMovieName(e.target.value);
//   };

//   debounces = debounce(this.onLabelChange, 1000);

//   render() {
//     return (
//       <div className="search-input-block">
//         <input className="search-input" placeholder="Type to search..." type="text" onChange={this.debounces} />
//       </div>
//     );
//   }
// }
/* eslint-disable no-return-assign */
import { Component } from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

export default class SearchPanel extends Component {
  static defaultProps = {
    searchMovieName: '',
    getMovieName: () => {},
  };

  static propTypes = {
    searchMovieName: PropTypes.string,
    getMovieName: PropTypes.func,
  };

  state = {
    label: '',
  };

  debounces = debounce((text) => this.funcApi(text), 1000);

  componentDidUpdate(prevProps, prevState) {
    const { searchMovieName } = this.props;
    if (prevState === this.state && searchMovieName === '') {
      this.setState({ label: '' });
    }
  }

  funcApi = (text) => {
    const { getMovieName } = this.props;
    return getMovieName(text);
  };

  onLabelChange = (e) => {
    this.setState({ label: e.target.value });
    this.debounces(e.target.value);
  };

  render() {
    const { label } = this.state;
    return (
      <div className="search-input-block">
        <input
          className="search-input"
          placeholder="Type to search..."
          type="text"
          onChange={this.onLabelChange}
          value={label}
        />
      </div>
    );
  }
}
