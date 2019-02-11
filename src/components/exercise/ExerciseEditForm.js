import React, { Component } from "react"
import "./Exercise.css"
import ExerciseManager from "../../modules/ExerciseManager";

export default class ExerciseEditForm extends Component {
  // Setting state:
  state = {
    id: "",
    userId: "",
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
  // Makes sense to place the update function before the handleFieldChange
  updateCurrentExercise = evt => {
    evt.preventDefault();
    const currentExercise = {
      id: this.state.id,
      userId: this.state.userId,
      exerciseName: this.state.exerciseName,
      bodyCategoryId: this.state.bodyCategoryId,
      categoryName: this.state.categoryName,
      equipmentTypeId: this.state.equipmentTypeId,
      equipmentName: this.state.equipmentName,
      sets: this.state.sets,
      reps: this.state.reps,
      weightLifted: this.state.weightLifted,
      notes: this.state.notes
    }
    this.props.updateExercise(this.props.match.params.exerciseId, currentExercise)
    .then(() => this.props.history.push("/"));
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
    ExerciseManager.get(this.props.match.params.exerciseId)
      .then(exercise => {
        this.setState({
          id: exercise.id,
          userId: exercise.userId,
          exerciseName: exercise.exerciseName,
          categoryName: exercise.categoryName.value,
          equipmentName: exercise.equipmentName.value,
          sets: exercise.sets,
          reps: exercise.reps,
          weightLifted: exercise.weightLifted,
          notes: exercise.notes
        })
      })
  }

  render() {
    return (
      <React.Fragment>
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
              value={this.state.bodyCategory}
            >
            <option defaultValue="">Select a body group</option>
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
              value={this.state.equipmentName}
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
              onClick={this.updateExercise}
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