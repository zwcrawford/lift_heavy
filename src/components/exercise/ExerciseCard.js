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
            {this.props.exercise.name}
            {this.props.exercise.bodyCategoryId}
            {this.props.exercise.equipmentTypeId}
            {this.props.exercise.sets}
            {this.props.exercise.reps}
            {this.props.exercise.weightLifted}
            {this.props.exercise.notes}
            <div className="editButton">
              <button
                href={`/exercises/${this.props.exercise.id}/edit`}
                onClick={() =>
                  this.props.updateExercise(this.props.exercise.id, this.props.exercise)}
                  className="card-link"
              >Edit</button>
            </div>
              <div className="deleteButton">
              <button
                onClick={() => this.props.deleteExercise(this.props.exercise.id)}
                className="card-link"
              >Delete</button>
            </div>
          </h5>
        </div>
      </div>
    );
  }
}