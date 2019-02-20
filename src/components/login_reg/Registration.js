/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// Registration holds authentication and form elements to grant or deny access to the application.
// This is a Presentation Component. Directly expresses HTML.

import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Registration extends Component {

  // Set state
  state = {
    email: "",
    password: ""
  }

  /*
  Update when a field is edited.
  Again, this is handling the field change for any input that references it on their onChange() method. In this case, they are listening for changes to the email and password input fields below.
  */
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }

  handleRegistration = evt => {
    evt.preventDefault()
    // Saving email and password as credentials in session storage
    sessionStorage.setItem(
      "credentials",
      JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    )
  }
  /*

  Defining the createNewUser() method:

  1. Create a new user object in users table with key: value pairs for id, email, and password.
  2. Call the postUser method from ApplicationViews with props.
  3. .then (promise) which redirect the user back to the login screen only after the post completes.
  */
  createNewUser = evt => {
    evt.preventDefault()
    const newUser = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.postUser(newUser)
    .then(() => this.props.history.push("/"))
  }

  /*
    *** RENDER ***
    This registration screen is fairly simple like Login and includes a heading, subheading, 2 labels tied to two inputs, and finally a login button and a register link. There's a thin black line border with curved edges around all other elements.
  */
  render() {
    return (
      <React.Fragment>
        {/* form starts here: */}
        <form className="exerciseAddForm" onSubmit={this.handleRegistration}>

          {/* form header: */}
          <h4>Register with LiftHeavy</h4>
          <p>Please enter your information:</p>
          {/* label and input for email: */}
          <label
            htmlFor="email"
          >Email: </label>
          <input
            onChange={this.handleFieldChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required=""
            autoFocus=""
          /><br />
          {/* label and input for password: */}
          <label
            htmlFor="password"
          >Password: </label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required=""
          /><br />
          {/* Create the new user. */}
          <button
            type="submit"
            className="btn btn-primary"
            id="add-form-btn"
            onClick={this.createNewUser}
          >Sign up</button>
          {/* If they decide not to sign up and hit cancel, they are brought back to login screen. */}
          <Link className="cancel" onClick={this.removeSessionUser} to="/">Cancel</Link>
        </form>
      </React.Fragment>
    )
  }
}
