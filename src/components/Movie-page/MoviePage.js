import React from "react"
import axios from "axios"
import "./MoviePage.css"
import MovieCard from "../Movie-card/MovieCard.js"
import {Rating} from "@material-ui/lab"
import poster_alt from "./poster_alt.png"

export default class MoviePage extends React.Component {
  state = {
    loading: true,
    movieDetails: null,
    movieCredits: null,
    similarMovies: null,
  }
  componentDidMount() {
    const {
      match: {params},
    } = this.props

    const requestMovieDetails = axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}
        ?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
    )
    const requestCredits = axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
    )
    const requestSimilarMovies = axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
    )
    axios
      .all([requestMovieDetails, requestCredits, requestSimilarMovies])
      .then(
        axios.spread((...responses) => {
          const movieDetails = responses[0]
          const movieCredits = responses[1]
          const similarMovies = responses[2]

          this.setState({
            movieDetails: movieDetails,
            movieCredits: movieCredits,
            similarMovies: similarMovies,
            loading: false,
          })
        })
      )
      .catch(errors => {})
  }
  runtime() {
    const hours = Math.floor(this.state.movieDetails.data.runtime / 60)
    const minutes = this.state.movieDetails.data.runtime - hours * 60
    return hours + " h " + minutes + " min"
  }

  render() {
    return (
      <div className="movie-page">
        {this.state.loading ? (
          <div></div>
        ) : (
          <div>
            <div className="section1">
              <div className="details">
                <p className="original-title">
                  {this.state.movieDetails.data.original_title}
                </p>
                <p className="tagline">
                  {this.state.movieDetails.data.tagline}
                </p>
                <Rating
                  name="half-rating-read"
                  defaultValue={this.state.movieDetails.data.vote_average / 2}
                  precision={0.1}
                  readOnly
                  max={5}
                />
                <p>
                  {this.runtime()}
                  <span className="separation-span">-</span>
                  {this.state.movieDetails.data.release_date}
                  <span className="separation-span">-</span>
                  {this.state.movieDetails.data.genres[0].name}{" "}
                </p>

                <h2 className="mini-section-title">Overview</h2>
                <p className="overview-content">
                  {this.state.movieDetails.data.overview}
                </p>
                <div>
                  <h2 className="mini-section-title">Cast</h2>
                  <div className="cast">
                    {this.state.movieCredits.data.cast
                      .slice(0, 5)
                      .map((item, i) => (
                        <div>
                          {!item.profile_path ? (
                            ""
                          ) : (
                            <div className="cast-div">
                              <img
                                key={i}
                                src={
                                  "http://image.tmdb.org/t/p/w200/" +
                                  item.profile_path
                                }
                                alt="not found"
                                className="cast-profile"
                              />
                              <div className="cast-details">
                                <p className="cast-name">{item.name}</p>
                                <p className="character">{item.character}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {!this.state.movieDetails.data.poster_path ? (
                <img
                  src={poster_alt}
                  alt="poster not found"
                  className="poster"
                ></img>
              ) : (
                <img
                  src={
                    "http://image.tmdb.org/t/p/w400/" +
                    this.state.movieDetails.data.poster_path
                  }
                  alt="poster not found"
                  className="poster"
                ></img>
              )}
            </div>
            <div className="similar-movies-container">
              <h2 className="mini-section-title">Similar movies</h2>
              <div className="similar-movies">
                {this.state.similarMovies.data.results
                  .slice(0, 5)
                  .map((item, i) => (
                    <MovieCard key={i} movie={item.id} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
