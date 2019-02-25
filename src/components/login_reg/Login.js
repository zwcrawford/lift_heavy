/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// Login holds authentication and form elements to grant or deny access to the application.
// This is a Presentation Component. Directly expresses HTML.

import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class UserLogin extends Component {

  // Set state
  state = {
    email: "",
    password: "",
  }

  /*
  Update when any field is edited. This is a nice way to prevent needing a function for every field.
  Instead the two inputs on this page can simply reference this function with their onChange() method: onChange={this.handleFieldChange} when the user makes a change.
  */
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    //console.log(this.state)
  }

  /*
  *** Login handler *** the following three steps are going to happen when the user clicks the "Login" button (shown below) and handleUserLogin() is executed:

      <button
        type="submit"
        className="btn btn-primary"
        onClick={this.handleUserLogin}
        >Login</button>

    1. The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    For example, this can be useful when:
      - Clicking on a "Submit" button, prevent it from submitting a form
      - Clicking on a link, prevent the link from following the URL
        * Note: Not all events are cancelable. Use the cancelable property to find out if an event is cancelable.
        * Note: The preventDefault() method does not prevent further propagation of an event through the DOM.                       Use the stopPropagation() method to handle this.

        * MyNote [ZC - I need to learn about propagation and how to find out if an event is cancelable"]

    2. A collection is being passed down from ApplicationViews and is available to its child, Login, via props. Here, the handleUserLogin() method is using that collection to check the database against the email and password entered by the user (see below)

    checkUserData(email, password) {
    return fetch(`${remoteURL}/users?email=${email}&password=${password}`)
    .then(e => e.json());

    3. (a) ***CONDITIONAL [* IF *] the user's data does not retrieve a match in the JSON database, pop up an error message for the user saying that data is not valid and to try again or register.

    3. (b) For everyone that does have a match in the users table, they (forEach) are logged in, their sessionStorage is set, and they are diverted to the "home" screen, which for this project is the ExerciseList component. There they can add exercise cards, see the cards listed out, and edit or delete the cards individually. A user may also logout which removes their session Storage credentials and returns the user to the login screen.

  */
  handleUserLogin = evt => {
    evt.preventDefault()
    this.props.checkUserData(this.state.email, this.state.password)
    .then(user => {
      if (user.length === 0) {
      alert("Your email is not in our system or your password is incorrect. Please try again or register with the link below.")
      } else {
        user.forEach(evt => {
        let loggedIn = false;
        if (this.state.email === evt.email && this.state.password === evt.password) {
          loggedIn = true
        }
        if (loggedIn === true) {
          sessionStorage.setItem("User", evt.id)
          this.props.getAllForUser(sessionStorage.getItem("User"))
          this.props.history.push("/home")
        }
      })
      }
    })
  }

  /*
    *** RENDER ***
    This login screen is fairly simple and includes a heading, subheading, 2 labels tied to two inputs, and finally a login button and a register link. There's a thin black line border with curved edges around all other elements.
  */
  render () {
    return (
      <React.Fragment>
        {/* form starts here: */}
        <form className="exerciseAddForm" onSubmit={this.handleUserLogin}>

          {/* form header: */}
          <h4>Welcome to LiftHeavy</h4>
          <p>Log your custom exercises</p>
          <label
            htmlFor="email"
          >Email: </label>
          <input
            onChange={this.handleFieldChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            autoFocus=""
          /><br />
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
          <button
            type="submit"
            className="btn btn-primary"
            id="add-form-btn"
            onClick={this.handleUserLogin}
          >Login</button>
          <Link
            className="register"
            to={`/register`}
          >Register here</Link>
        </form>
      </React.Fragment>
    )
  }
}