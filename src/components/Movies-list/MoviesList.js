import React from "react"
import axios from "axios"
import "./MoviesList.css"
import MovieCard from "../Movie-card/MovieCard.js"
export default class MoviesList extends React.Component {
  state = {
    loading: true,
    movies: null,
    listname: "",
  }
  componentDidMount() {
    const {
      match: {params},
    } = this.props

    if (params.listname === "trending_this_week") {
      const request = axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
      )
      const listname = "Trending  this week"

      axios
        .all([request])
        .then(
          axios.spread((...responses) => {
            const movies = responses[0]
            this.setState({
              movies: movies,
              loading: false,
              listname: listname,
            })
          })
        )
        .catch(errors => {})
    } else if (params.listname === "upcoming") {
      const request = axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
      )
      const listname = "Upcoming movies"

      axios
        .all([request])
        .then(
          axios.spread((...responses) => {
            const movies = responses[0]
            this.setState({
              movies: movies,
              loading: false,
              listname: listname,
            })
          })
        )
        .catch(errors => {})
    } else if (params.listname === "now_playing") {
      const request = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
      )
      const listname = "Now playing"

      axios
        .all([request])
        .then(
          axios.spread((...responses) => {
            const movies = responses[0]
            this.setState({
              movies: movies,
              loading: false,
              listname: listname,
            })
          })
        )
        .catch(errors => {})
    } else if (params.listname === "popular") {
      const request = axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
      )
      const listname = "Popular movies"
      axios
        .all([request])
        .then(
          axios.spread((...responses) => {
            const movies = responses[0]
            this.setState({
              movies: movies,
              loading: false,
              listname: listname,
            })
          })
        )
        .catch(errors => {})
    } else if (params.listname === "top_rated") {
      const request = axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=34b0b74f552d5e8112df1bf1fbcba13e`
      )
      const listname = "Top rated movies"
      axios
        .all([request])
        .then(
          axios.spread((...responses) => {
            const movies = responses[0]
            this.setState({
              movies: movies,
              loading: false,
              listname: listname,
            })
          })
        )
        .catch(errors => {})
    }
  }

  render() {
    return (
      <div>
        <h1 className="page-title">{this.state.listname}</h1>
        {this.state.loading ? (
          ""
        ) : (
          <div className="the-movies">
            {this.state.movies.data.results.map((item, i) => (
              <MovieCard key={i} movie={item.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}
