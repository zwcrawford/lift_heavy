import React, { Component } from "react";
import "./Exercise.css";

// "exercises": [
//   {
//       "id": 1,
//       "userId": 1,
//       "exerciseName": "squat",
//       "bodyCategoryId": 9,
//       "equipmentTypeId": 2,
//       "sets": 1,
//       "reps": 10,
//       "weightLifted": 275,
//       "notes": "Light. Go to 300 next time"
//   },
export default class ExerciseAddForm extends Component {
  // Set initial state.
  state = {
    exerciseName: "",
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

  /* Local method for validation, creating animal object, and invoking the function reference passed from parent component*/
  constructNewExercise = evt => {
    evt.preventDefault();
    const exercise = {
      exerciseName: this.state.exerciseName,
      equipmentTypeId: this.state.equipmentTypeId,
      sets: this.state.sets,
      reps: this.state.reps,
      weightLifted: this.state.weightLifted,
      notes: this.state.notes
    };
    // Create the exercise and route the user back to the exerciseList
    this.props.addExercise(exercise)
    .then(() => this.props.history.push("/exercises"));
  }

  render() {
    return (
      <React.Fragment>
        <form className="exerciseAddForm">
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise Name</label>
            <input
              type="text"
              required
              autoFocus
              className="form-control"
              onChange={this.handleFieldChange}
              id="exerciseName"
              placeHolder="Exercise name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise Name</label>
            <input
              type="text"
              required
              autoFocus
              className="form-control"
              onChange={this.handleFieldChange}
              id="exerciseName"
              placeHolder="Exercise name"
            />
          </div>
        </form>
      </React.Fragment>
    )
  }
}