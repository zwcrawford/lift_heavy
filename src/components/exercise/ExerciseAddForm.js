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

  /* Local method for validation, creating exercise object, and invoking the function reference passed from parent component*/
  constructNewExercise = evt => {
    evt.preventDefault();
    const exercise = {
      exerciseName: this.state.exerciseName,
      bodyCategoryId: this.state.bodyCategoryId,
      equipmentTypeId: this.state.equipmentTypeId,
      sets: this.state.sets,
      reps: this.state.reps,
      weightLifted: this.state.weightLifted,
      notes: this.state.notes
    };
    // Create the exercise and route the user back to the exerciseList
    this.props.addExercise(exercise)
    .then(() => this.props.history.push("/exercise"));
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
            <label htmlFor="exerciseName">Exercise Name:</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="exerciseName"
              placeholder="Exercise name"
            />
          </div>
          {/* text and dropdown for body group: */}
          <div className="form-group">
            <label htmlFor="bodyCategoryId">Body Group:</label>
            <br />
            <select
              defaultValue=""
              name="bodyCategoryId"
              id="bodyCategoryId"
              onChange={this.handleFieldChange}
            >
            <option value="">Select a body group</option>
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
              defaultValue=""
              name="equipmentTypeId"
              id="equipmentTypeId"
              onChange={this.handleFieldChange}
            >
            <option value="">Select equipment</option>
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
              type="text"
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
              type="text"
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
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="weightLifted"
              placeholder="Enter the number of reps"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <input
              type="textarea"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="notes"
              placeholder="Additional Notes"
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.constructNewExercise}
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