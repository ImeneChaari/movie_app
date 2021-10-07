import React from "react"
import axios from "axios"
import "./MovieCard.css"
import {Rating} from "@material-ui/lab"
import poster_alt from "./poster_alt.png"

export default class MovieCard extends React.Component {
  state = {loadingDetails: true, movieDetails: null}
  componentDidMount() {
    const requestMovieDetails = axios.get(
      `https://api.themoviedb.org/3/movie/` +
        this.props.movie +
        `?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
    )
    axios
      .all([requestMovieDetails])
      .then(
        axios.spread((...responses) => {
          const movieDetails = responses[0]

          this.setState({
            loadingDetails: false,
            movieDetails: movieDetails,
          })
        })
      )
      .catch(errors => {})
  }

  render() {
    return (
      <a href={"http://localhost:3000/#/movie" + this.props.movie}>
        <div>
          {this.state.loadingDetails ? (
            <div></div>
          ) : (
            <div className="movie-card">
              {!this.state.movieDetails.data.poster_path ? (
                <img src={poster_alt} alt="poster not found"></img>
              ) : (
                <img
                  src={
                    "http://image.tmdb.org/t/p/w200/" +
                    this.state.movieDetails.data.poster_path
                  }
                  alt="poster not found"
                ></img>
              )}

              <div className="movie-details-div">
                <p className="movie-name">
                  {this.state.movieDetails.data.original_title}
                </p>
                <Rating
                  name="half-rating-read"
                  defaultValue={this.state.movieDetails.data.vote_average / 2}
                  precision={0.1}
                  readOnly
                  max={5}
                />
              </div>
            </div>
          )}
        </div>
      </a>
    )
  }
}
