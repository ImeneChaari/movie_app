import React from "react"
import "./App.css"
import {Route, Switch, HashRouter} from "react-router-dom"
import Homepage from "./components/Homepage/Homepage.js"
import Movies from "./components/Movies/Movies.js"
import MoviePage from "./components/Movie-page/MoviePage.js"
import Navbar from "./components/Navbar/Navbar.js"
import Footer from "./components/Footer/Footer.js"
import MoviesList from "./components/Movies-list/MoviesList.js"
import SearchResult from "./components/Search/SearchResult.js"
import FilterResult from "./components/Filter/FilterResult.js"
export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/search:keyword" component={SearchResult} />
            <Route exact path="/movies" component={Movies} />
            <Route
              exact
              path="/movies/:genre/:rating"
              component={FilterResult}
            />
            <Route exact path="/movie:id" component={MoviePage} />
            <Route exact path="/:listname" component={MoviesList} />
          </Switch>
        </HashRouter>
        <Footer />
      </div>
    )
  }
}
