import './Rating.css';
import '../movie-card/MovieCard.css';
import { rateMovie } from '../movie-db-api/movie-db-api';
import { Rate } from 'antd';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Rating extends Component {
  state = {
    rate: 0,
  };

  static defaultProps = {
    guestToken: '',
    id: '',
    rating: 0,
  };

  static propTypes = {
    guestToken: PropTypes.string,
    id: PropTypes.number,
    rating: PropTypes.number,
  };

  putValue = () => {
    const { rate } = this.state;
    const { rating } = this.props;
    const defaultValue = rating || rate;
    return defaultValue;
  };

  onRateMovie = (rateValue, id, guestToken) => rateMovie(id, rateValue, guestToken);

  render() {
    const { id, guestToken } = this.props;
    return (
      <Rate
        allowHalf
        defaultValue={0}
        count={10}
        value={this.putValue()}
        onChange={(rateValue) => {
          this.setState({ rate: rateValue });
          this.onRateMovie(rateValue, id, guestToken);
        }}
      />
    );
  }
}
