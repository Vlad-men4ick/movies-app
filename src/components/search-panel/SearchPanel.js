import { Component } from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

export default class SearchPanel extends Component {
  static defaultProps = {
    getMovieName: () => {},
  };

  static propTypes = {
    getMovieName: PropTypes.func,
  };

  // eslint-disable-next-line react/sort-comp
  onLabelChange = (e) => {
    const { getMovieName } = this.props;
    getMovieName(e.target.value);
  };

  debounces = debounce(this.onLabelChange, 1000);

  render() {
    return (
      <div className="search-input-block">
        <input className="search-input" placeholder="Type to search..." type="text" onChange={this.debounces} />
      </div>
    );
  }
}
