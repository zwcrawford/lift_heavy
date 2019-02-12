import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Registration extends Component {

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

  handleRegistration = evt => {
    evt.preventDefault()
    // Saving email in session storage
    sessionStorage.setItem(
      "credentials",
      JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    )
  }
  // Create a new user object in users table
  createNewUser = evt => {
    evt.preventDefault()
    const newUser = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.postUser(newUser)
    .then(() => this.props.history.push("/"))
  }

  render() {
    return (
      <React.Fragment>
        {/* form starts here: */}
        <form className="exerciseAddForm" onSubmit={this.handleRegistration}>

          {/* form header: */}
          <h4>Welcome to LiftHeavy</h4>
          <p>Please register here:</p>
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
            onClick={this.createNewUser}
          >Login</button>
        </form>
      </React.Fragment>
    )
  }
}
