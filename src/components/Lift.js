/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import "./Lift.css"
import "bootstrap/dist/css/bootstrap.min.css"


export default class Lift extends Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationViews />
      </React.Fragment>
    );
  }
}