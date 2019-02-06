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
          {/* Form header: */}
          <h4>Add an Exercise:</h4>
          {/* Form starts here: */}
          {/* text and input for exercise name: */}
          <div className="form-group">
            <text htmlFor="exerciseName">Exercise Name:</text>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="exerciseName"
              placeholder="Exercise name"
            />
          </div>
          {/* text and input for body group: */}
          <div className="form-group">
            <text htmlFor="bodyCategoryId">Body Group:</text>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="bodyCategoryId"
              placeHolder="Leg day?"
            />
          </div>
          {/* text and input for equipment type: */}
          <div className="form-group">
            <text htmlFor="equipmentTypeId">Equipment:</text>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="equipmentTypeId"
              placeHolder="Equipment type"
            />
          </div>
          {/* text and input for sets: */}
          <div className="form-group">
            <text htmlFor="sets">Sets:</text>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="sets"
              placeHolder="Number of sets"
            />
          </div>
          {/* text and input for reps: */}
          <div className="form-group">
            <text htmlFor="reps">Reps:</text>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="reps"
              placeHolder="Number of reps"
            />
          </div>
          {/* text and input for weight: */}
          <div className="form-group">
            <text htmlFor="weightLifted">Weight Lifted:</text>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="weightLifted"
              placeHolder="Enter the number of reps"
            />
          </div>
          <div className="form-group">
            <text htmlFor="notes">Notes:</text>
            <input
              type="textarea"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="notes"
              placeHolder="Additional Notes"
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.constructNewTask}
              id="add-form-btn"
            >Save
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.clearForm}
              id="add-form-btn"
            >Clear
            </button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}