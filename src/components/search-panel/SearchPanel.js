/* eslint-disable react/sort-comp */
import { Component } from 'react';
import debounce from 'lodash.debounce';

export default class SearchPanel extends Component {
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
