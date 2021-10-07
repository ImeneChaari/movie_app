import React from "react"
import axios from "axios"
import "./FilterResult.css"
import MovieCard from "../Movie-card/MovieCard.js"
import Filter from "../Filter/Filter.js"
export default class FilterResult extends React.Component {
  state = {
    loading: true,
    filterOutput: null,
  }
  componentDidMount() {
    const {
      match: {params},
    } = this.props
    const requestFilterResults = axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=34b0b74f552d5e8112df1bf1fbcba13e&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=${params.rating}&with_genres=${params.genre}`
    )

    axios
      .all([requestFilterResults])
      .then(
        axios.spread((...responses) => {
          const filterOutput = responses[0]
          this.setState({
            filterOutput: filterOutput,
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
        <h1 className="page-title">Results</h1>
        <Filter />
        {this.state.loading ? (
          ""
        ) : (
          <div className="the-movies">
            {this.state.filterOutput.data.results.map((item, i) => (
              <MovieCard key={i} movie={item.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}
