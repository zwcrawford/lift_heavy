/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// - ExerciseAddForm holds the form to add exercises to the database and subsequently, the ExerciseList where each exercise is represented on the DOM as a simple card.
// - This is a Presentation Component. Directly expresses HTML.

import React, { Component } from "react";
import { Link } from "react-router-dom"
import NavBar from "../nav/NavBar"
import "./Exercise.css";

export default class ExerciseAddForm extends Component {
  // Set initial state.
  state = {
    id: "",
    exerciseName: "",
    categoryName: "",
    equipmentName: "",
    bodyCategoryId: "",
    equipmentTypeId: "",
    sets: "",
    reps: "",
    weightLifted: "",
    notes: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /* Local method for validation, creating exercise object, and invoking the function reference passed from parent component*/
  constructNewExercise = evt => {
    evt.preventDefault();
    const exercise = {
      userId: Number(sessionStorage.getItem("User")),
      exerciseName: this.state.exerciseName,
      bodyCategoryId: Number(this.state.bodyCategoryId),
      categoryName: this.state.categoryName,
      equipmentTypeId: Number(this.state.equipmentTypeId),
      equipmentName: this.state.equipmentName,
      sets: Number(this.state.sets),
      reps: Number(this.state.reps),
      weightLifted: Number(this.state.weightLifted),
      notes: this.state.notes
    };
    // Create the exercise and route the user back to the exerciseList
    console.log(this.props.exerciseName);
    this.props.addExercise(exercise)
    .then(() => this.props.history.push("/home"));
  }

  /*
    *** RENDER ***
    This was the first significant form I made to collect user data. Only the ExerciseList and ExerciseCard came first which are strictly focused on output. In an attempt to find a cheap and easy way to stick in some form validation, most of my inputs have "required" as an attribute though I am not sure how well that is working...?

    I planned to style this project in a basic but professional way but I had to add some even more basic styling upfront for my own sanity when testing. In my opinion, having these minimal styling options helps me be more productive.

    Takeaways here are that dropdown lists are not to be taken lightly. They were the most challenging part of this project for me.
    Both in terms of getting them to display properly and in reading and displaying the user's selection.

  */
  render() {

    return (
      <React.Fragment>
        <NavBar />
        {/* form starts here: */}
        <form className="exerciseAddForm">

          {/* form header: */}
          <h4>Add an Exercise:</h4>

          {/* text and input for exercise name: */}
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise Name:</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="exerciseName"
              placeholder="Exercise name"
              autoFocus=""
            />
          </div>
          {/* text and dropdown for body group: */}
          <div className="form-group">
            <label htmlFor="bodyCategoryId">Body Group:</label>
            <br />
            <select
              value={this.categoryName}
              name="bodyCategoryId"
              id="bodyCategoryId"
              onChange={this.handleFieldChange}
              >
            {/* Display a default selection: */}
            <option defaultValue="">Select body group</option>
            {/* The map() method creates a new array with the results of calling a provided function on every element
            in the calling array. */}

            {/* Map the bodyCategories to a new array, set the key and value for each option, and display the name for each option in the dropdown for the user to select */}
            {this.props.bodyCategories.map(evt => (
              <option key={evt.id} value={evt.id}>
              {evt.categoryName}
              </option>
            ))}
            </select>
          </div>
          {/* text and dropdown for equipment type: */}
          <div className="form-group">
            <label htmlFor="equipmentTypeId">Equipment Type:</label>
            <br />
            <select
              value={this.equipmentName}
              name="equipmentTypeId"
              id="equipmentTypeId"
              onChange={this.handleFieldChange}
            >
            <option defaultValue="">Select equipment</option>
            {this.props.equipmentTypes.map(evt => (
              <option key={evt.id} value={evt.id}>
              {evt.equipmentName}
              </option>
            ))}
            </select>
          </div>
          {/* text and input for sets: */}
          <div className="form-group">
            <label htmlFor="sets">Sets:</label>
            <input
              type="number"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="sets"
              placeholder="Number of sets"
            />
          </div>
          {/* text and input for reps: */}
          <div className="form-group">
            <label htmlFor="reps">Reps:</label>
            <input
              type="number"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="reps"
              placeholder="Number of reps"
            />
          </div>
          {/* text and input for weight: */}
          <div className="form-group">
            <label htmlFor="weightLifted">Weight Lifted:</label>
            <input
              type="number"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="weightLifted"
              placeholder="Enter the number of reps"
            />
          </div>
          {/* text and input for notes: */}
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              type="textarea"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="notes"
              placeholder="Additional Notes"
            />
          </div>
          <div>
            {/*
            Create the exercise via constructNewExercise which will redirect user back to ExerciseList
            submit button:
            */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.constructNewExercise}
              id="add-form-btn"
            >Save
            </button>
            {/* << implementing later >> */}
            {/* clear button: */}
            {/* <button
              type="submit"
              className="btn btn-primary"
              onClick={this.clearForm}
              id="clr-form-btn"
            >Clear
            </button> */}
            <Link
            className="nav-link"
            to={`/home`}
          >Back</Link>
          </div>
        </form>
      </React.Fragment>
    )
  }
}