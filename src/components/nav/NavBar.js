import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {

    removeSessionUser = () => {
        sessionStorage.clear()
    }

    render() {
      return (
        <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={this.removeSessionUser} to="/">Logout</Link>
            </li>
            <li className="nav-item">
              <label></label>
            </li>
                </ul>
            </nav>
        )
    }
}
export default NavBar