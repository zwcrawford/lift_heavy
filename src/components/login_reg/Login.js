import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class UserLogin extends Component {

  // Set state
  state = {
    email: "",
    password: "",
  }

  // Update when a field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(this.state)
  }

  // Login handler
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
          console.log(evt.id);
          
        }
      })
      }
    })
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