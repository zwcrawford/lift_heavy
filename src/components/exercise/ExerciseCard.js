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

export default class ExerciseCard extends Component {
  render() {
    return (
      <div key={this.props.exercise.id} className="exerciseCard">
        <div className="card-body">
          <h5 className="card-title">
            Exercise: {this.props.exercise.exerciseName}
          </h5>
          <label>
            Body Group: {this.bodyCategory.categoryName}
          </label>
          <br />
          <label>
            Equipment: {this.exercise.exerciseType.exerciseName}
          </label>
          <br />
          <label>
            # of Sets: {this.props.exercise.sets}
          </label>
          <br />
          <label>
            # of Reps: {this.props.exercise.reps}
          </label>
          <br />
          <label>
            Weigh / Set: {this.props.exercise.weightLifted}
          </label>
          <br />
          <label>
            Notes: {this.props.exercise.notes}
          </label>
          <div className="editButton">
            <button
              href={`/exercises/${this.props.exercise.id}/edit`}
              onClick={() =>
                this.props.updateExercise(this.props.exercise.id, this.props.exercise)}
                className="card-button"
            >Edit</button>
          </div>
            <div className="deleteButton">
            <button
              onClick={() => this.props.deleteExercise(this.props.exercise.id)}
              className="card-button"
            >Delete</button>
          </div>
        </div>
      </div>
    );
  }
}