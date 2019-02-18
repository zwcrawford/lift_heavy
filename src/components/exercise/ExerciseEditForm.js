/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// ExerciseEditForm holds the form that always displays when a user clicks the edit link from the ExerciseCard.
// This is a Presentation Component. Directly expresses HTML.

import React, { Component } from "react"
import NavBar from "../nav/NavBar"
import "./Exercise.css"
import ExerciseManager from "../../modules/ExerciseManager";

export default class ExerciseEditForm extends Component {
  /*
  State is simply the current values of the properties used to render a component.

  I am initializing state by defining a state at the top of my class definition for all data that the application will need.

  Here I am starting with mainly empty strings to set state. I want to ensure that what the user inputs later will
  be set as state.
  Setting state for this project:
  */
  state = {
    id: "",
    userId: Number(sessionStorage.getItem("User")),
    exerciseName: "",
    categoryName: "",
    equipmentName: "",
    bodyCategoryId: 0,
    equipmentTypeId: 0,
    sets: "",
    reps: "",
    weightLifted: "",
    notes: ""
  }
  // Makes sense to me that the update function should be before the handleFieldChange
  // This is executed when the user clicks the "Update" button.
  updateCurrentExercise = evt => {
    evt.preventDefault();
    const currentExercise = {
      id: this.state.id,
      userId: this.state.userId,
      exerciseName: this.state.exerciseName,
      bodyCategoryId: Number(this.state.bodyCategoryId),
      categoryName: this.state.categoryName,
      equipmentTypeId: Number(this.state.equipmentTypeId),
      equipmentName: this.state.equipmentName,
      sets: Number(this.state.sets),
      reps: Number(this.state.reps),
      weightLifted: Number(this.state.weightLifted),
      notes: this.state.notes
    }
    this.props.updateExercise(this.props.match.params.exerciseId, currentExercise)
    .then(() => this.props.history.push("/home"));
  }

  handleFieldChange = evt => {
    //Creating the empty object stateToChange
    const stateToChange = {}
    // [evt.target.id] is like an array counter. The target depends on the
    // field with event listeners.
    stateToChange[evt.target.id] = [evt.target.value]
    this.setState(stateToChange)
  }

  componentDidMount() {
    // Get the exerciseId that matches the one from the database (after being updated via updateCurrentExercise)
    // Then use it to set state for each key:value in the exercise object.
    ExerciseManager.get(this.props.match.params.exerciseId)
      .then(exercise => {
        this.setState({
          id: exercise.id,
          userId: exercise.userId,
          exerciseName: exercise.exerciseName,
          bodyCategoryId: Number(exercise.bodyCategoryId),
          categoryName: exercise.categoryName,
          equipmentTypeId: Number(exercise.equipmentTypeId),
          equipmentName: exercise.equipmentName,
          sets: Number(exercise.sets),
          reps: Number(exercise.reps),
          weightLifted: Number(exercise.weightLifted),
          notes: exercise.notes
        })
      })
      console.log("exercise.userId")
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        {/* form starts here: */}
        <form className="exerciseAddForm">

          {/* form header: */}
          <h4>Edit This Exercise:</h4>

          {/* text and input for exercise name: */}
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise Name:</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="exerciseName"
              value={this.state.exerciseName}
              autoFocus=""
            />
          </div>
          {/* text and dropdown for body group: */}
          <div className="form-group">
            <label htmlFor="bodyCategoryId">Body Group:</label>
            <br />
            <select
              name="bodyCategoryId"
              id="bodyCategoryId"
              onChange={this.handleFieldChange}
              value={this.state.bodyCategoryId}
            >
            <option defaultValue={this.state.bodyCategoryId}>Select a body group</option>
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
              name="equipmentTypeId"
              id="equipmentTypeId"
              onChange={this.handleFieldChange}
              value={this.state.equipmentTypeId}
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
              value={this.state.sets}
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
              value={this.state.reps}
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
              placeholder="Enter the weight"
              value={this.state.weightLifted}
            />
          </div>
          {/* text and input for notes: */}
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <input
              type="textarea"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="notes"
              placeholder="Additional Notes"
              value={this.state.notes}
            />
          </div>
          <div>
            {/* submit button: */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.updateCurrentExercise}
              id="add-form-btn"
            >Update
            </button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}