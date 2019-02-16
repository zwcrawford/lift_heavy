/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// NavBar holds navigation elements to always be displayed on pages that require it.
// This is a Presentation Component. Directly expresses HTML.

import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {
    // This is my function to remove a user's credentials from sessionStorage.
    removeSessionUser = () => {
        sessionStorage.clear()
    }
    // Home will take users to the ExerciseList component where their exercises will be listed if they have any saved.
    // The other link is to logout a user. It removes a user's credentials from sessionStorage, takes them back to the login page, and they no longer have access to the site.
    // Because this component is using "Link" elements, I had to import the Link from react-router-dom above, line 14.
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