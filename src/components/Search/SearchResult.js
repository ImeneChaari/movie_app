import React from "react"
import axios from "axios"
import "./SearchResult.css"
import MovieCard from "../Movie-card/MovieCard.js"
export default class SearchResult extends React.Component {
  state = {
    loading: true,
    searchOutput: null,
  }
  componentDidMount() {
    const {
      match: {params},
    } = this.props
    const requestSearchResults = axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=34b0b74f552d5e8112df1bf1fbcba13e&query=${params.keyword}&page=1&include_adult=false`
    )
    axios
      .all([requestSearchResults])
      .then(
        axios.spread((...responses) => {
          const searchOutput = responses[0]
          this.setState({
            searchOutput: searchOutput,
            loading: false,
          })
          console.log(this.state)
        })
      )
      .catch(errors => {})
  }

  render() {
    return (
      <div>
        <h1 className="page-title">Search results</h1>
        {this.state.loading ? (
          ""
        ) : (
          <div className="the-movies">
            {this.state.searchOutput.data.results.map((item, i) => (
              <MovieCard key={i} movie={item.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}
