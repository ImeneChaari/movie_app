import React from "react"
import axios from "axios"
import "./Movies.css"
import Filter from "../Filter/Filter.js"
import MovieCard from "../Movie-card/MovieCard.js"
export default class Movies extends React.Component {
  state = {
    loading: true,
    trendingMovies: null,
    upcomingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
  }

  componentDidMount() {
    const requestTrendingMovies = axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
    )
    const requestUpcomingMovies = axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
    )
    const requestNowPlayingMovies = axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
    )
    const requestPopularMovies = axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
    )
    const requestTopRatedMovies = axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
    )

    axios
      .all([
        requestTrendingMovies,
        requestUpcomingMovies,
        requestNowPlayingMovies,
        requestPopularMovies,
        requestTopRatedMovies,
      ])
      .then(
        axios.spread((...responses) => {
          const trendingMovies = responses[0]
          const upcomingMovies = responses[1]
          const nowPlayingMovies = responses[2]
          const popularMovies = responses[3]
          const topRatedMovies = responses[4]

          this.setState({
            trendingMovies: trendingMovies,
            upcomingMovies: upcomingMovies,
            nowPlayingMovies: nowPlayingMovies,
            popularMovies: popularMovies,
            topRatedMovies: topRatedMovies,
            loading: false,
          })
        })
      )
      .catch(errors => {})
  }

  render() {
    return (
      <div className="movies-main">
        <h1 className="page-title" id="movies-page-title">
          Movies
        </h1>
        <Filter />
        {this.state.loading ? (
          ""
        ) : (
          <div className="the-movies">
            {[
              this.state.trendingMovies,
              this.state.upcomingMovies,
              this.state.topRatedMovies,
              this.state.popularMovies,
              this.state.nowPlayingMovies,
            ].map((list, i) =>
              list.data.results.map((movie, j) => (
                <MovieCard key={j} movie={movie.id} />
              ))
            )}
          </div>
        )}
      </div>
    )
  }
}
