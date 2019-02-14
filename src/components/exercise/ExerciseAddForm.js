import React, { Component } from "react";
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
      exerciseName: this.props.exerciseName,
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

  render() {

    return (
      <React.Fragment>
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
            <option defaultValue="">Select body group</option>
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
            {/* submit button: */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.constructNewExercise}
              id="add-form-btn"
            >Save
            </button>
            {/* clear button: */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.clearForm}
              id="clr-form-btn"
            >Clear
            </button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}