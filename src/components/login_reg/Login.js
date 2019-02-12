import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class UserLogin extends Component {

  // Set state
  state = {
    email: "",
    password: ""
  }

  // Update when a field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }

  // Login handler
  handleUserLogin = evt => {
    evt.preventDefault()
    // Saving email in session storage
    sessionStorage.setItem(
      "email", this.state.email
    )
    // Check the users table to see if that email exists.
    let newUser = sessionStorage.getItem("email")
    let authorized = this.props.users.find(user => user.email === newUser)

    if (authorized === undefined) {
      alert("This email is not registered. Please register and try again.")
    }
    else {
      sessionStorage.setItem("email", authorized.id)
      //let verifiedUser = sessionStorage.getItem("email")
      this.props.updateComponent()
      this.props.history.push("/home")
    }
  }

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
            required=""
            autofocus=""
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
            onClick={this.handleUserLogin}
          >Login</button>
          <Link
            className="register"
            to={`/register`}
          >Click here to register</Link>
        </form>
      </React.Fragment>
    )
  }
}