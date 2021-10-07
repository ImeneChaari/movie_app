import React from "react"
import "./Navbar.css"
import Search from "../Search/Search.js"

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="nav-fields">
          <a href="http://localhost:3000/#/">Home</a>
          <a href="http://localhost:3000/#/movies">Movies</a>
        </div>

        <Search />
      </div>
    )
  }
}
