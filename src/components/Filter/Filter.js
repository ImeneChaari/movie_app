import React from "react"
import "./Filter.css"
import search from "./search.png"

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      genre: "action",
    }

    this.handleRatingChange = this.handleRatingChange.bind(this)

    this.handleGenreChange = this.handleGenreChange.bind(this)
  }
  handleGenreChange(event) {
    this.setState({genre: event.target.value})
  }
  handleRatingChange(event) {
    this.setState({rating: event.target.value * 2})
  }

  render() {
    return (
      <div className="filter-main">
        <label htmlFor="genres">Genre</label>
        <select name="genres" id="genres" onChange={this.handleGenreChange}>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="thriller">Thriller</option>
          <option value="adventure">Adventure</option>
          <option value="romance">Romance</option>
          <option value="war">War</option>
          <option value="crime">Crime</option>
          <option value="horror">Horror</option>
          <option value="mystery">Mystery</option>
          <option value="history">History</option>
          <option value="documentary">Documentary</option>
          <option value="music">Music</option>
          <option value="animated">Animated</option>
          <option value="family">Family</option>
          <option value="fantasy">Fantasy</option>
          <option value="western">Western</option>
        </select>
        <label htmlFor="rating">Rating</label>
        <select name="rating" id="rating" onChange={this.handleRatingChange}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <a
          href={
            "http://localhost:3000/#/movies/" +
            this.state.genre +
            "/" +
            this.state.rating
          }
        >
          <button id="filter-btn">
            <img src={search} id="filter-icon" alt=""></img>
          </button>
        </a>
      </div>
    )
  }
}
