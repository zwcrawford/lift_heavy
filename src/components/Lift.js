/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// Lift.js will define which children it will render, in this example, Lift is only going to render ApplicationViews however, at the start of this project, I had the NavBar component included as well. Only when I realized that, because of login, I did not need the NavBar on every page, I then removed it from here and only added it to the pages that need it.
// This is a Controller Component. Its only responsibility is to control the behavior of the system. It maps URLs to components.
import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import "./Lift.css"
import "bootstrap/dist/css/bootstrap.min.css"
import logo from '../images/logo.jpg'
import Lift_Heavy_logo from '../images/Lift_Heavy_logo.jpg'

// Here we are defining the components that will get rendered by the Lift component: ApplicationViews.js.

export default class Lift extends Component {
  render() {
    return (
      <React.Fragment>
        <img src={logo} alt="lifter logo" className="underlay"/>
        <img src={Lift_Heavy_logo} alt="lifter logo" className="overlay"/>
        <ApplicationViews />
      </React.Fragment>
    );
  }
}