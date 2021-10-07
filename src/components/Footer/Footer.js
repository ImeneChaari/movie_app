import React from "react"
import icons from "./social-media-icons.png"
import "./Footer.css"

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>Follow us</p>
        <img src={icons} className="icons" alt=""></img>
        <p>All rights reserved 2020</p>
      </div>
    )
  }
}
