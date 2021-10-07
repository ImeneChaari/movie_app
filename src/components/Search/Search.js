import React from "react"
import "./Search.css"
import search from "./search.png"

export default class Search extends React.Component {
  state = {
    keyword: "",
  }
  handleInputChange = event => {
    this.setState({
      keyword: event.target.value,
    })
  }

  render() {
    return (
      <div className="search">
        <input
          type="text"
          onChange={this.handleInputChange}
          id="search-input"
          placeholder="Search movies"
        ></input>
        <a href={"http://localhost:3000/#/search" + this.state.keyword}>
          <button id="search-btn">
            <img src={search} id="search-icon" alt=""></img>
          </button>
        </a>
      </div>
    )
  }
}
