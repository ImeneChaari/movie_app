import React from "react"
import "./Movie-bloc-homepage.css"
import MovieCard from "../Movie-card/MovieCard.js"
export default class MovieBlocHomepage extends React.Component {
  listname() {
    if (this.props.listName === "Trending this week")
      return "trending_this_week"
    else if (this.props.listName === "Upcoming movies") return "upcoming"
    else if (this.props.listName === "Now playing") return "now_playing"
    else if (this.props.listName === "Popular movies") return "popular"
    else if (this.props.listName === "Top rated movies") return "top_rated"
  }
  render() {
    return (
      <div className="movie-bloc">
        <div className="bloc-header">
          <h1>{this.props.listName}</h1>
          <a href={"http://localhost:3000/#/" + this.listname()}>
            <button>See More</button>
          </a>
        </div>
        <div className="movies-to-show">
          {this.props.list.data.results.slice(0, 5).map((item, i) => (
            <MovieCard key={i} movie={item.id} />
          ))}
        </div>
      </div>
    )
  }
}
