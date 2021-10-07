import React from "react"
import axios from "axios"
import "./Homepage.css"
import MovieBlocHomepage from "../Movie-bloc-homepage/Movie-bloc-homepage.js"

export default class Homepage extends React.Component {
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
      <div className="main">
        <div className="movie-blocs">
          {this.state.loading ? (
            ""
          ) : (
            <>
              <MovieBlocHomepage
                list={this.state.trendingMovies}
                listName="Trending this week"
              />

              <MovieBlocHomepage
                list={this.state.upcomingMovies}
                listName="Upcoming movies"
              />

              <MovieBlocHomepage
                list={this.state.nowPlayingMovies}
                listName="Now playing"
              />

              <MovieBlocHomepage
                list={this.state.popularMovies}
                listName="Popular movies"
              />

              <MovieBlocHomepage
                list={this.state.topRatedMovies}
                listName="Top rated movies"
              />
            </>
          )}
        </div>
      </div>
    )
  }
}
