import { Component } from "react";

import MovieCard from "../movie-card/MovieCard";

import './MovieCardList.css'

export default class MovieCardList extends Component {

    render(){
            const {movieList} = this.props

    const leftMovieList = movieList.map((movieItem, index) => {
        return (
            <MovieCard key={movieItem.id}
                       movieTitle={movieItem.original_title}
                       date={movieItem.release_date}
                       genres={movieItem.genres}
                       description={movieItem.overview}
                       imgPath={movieItem.poster_path}
            />
        );
    });
        return(
            <ul className="movieList">
                { leftMovieList }
            </ul>
        )
    }
}