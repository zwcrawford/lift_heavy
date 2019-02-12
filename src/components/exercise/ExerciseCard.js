import React, { Component } from "react";
import { Link } from "react-router-dom"
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
    // console here
    //console.log("Test", this.props);

    return (
      <React.Fragment>
        <div key={this.props.exercise.id} className="exerciseCard">
          <div className="card-body">
            <h5 className="card-title">
              Exercise: {this.props.exercise.exerciseName}
            </h5>
            <label>
              Body Group: {this.props.exercise.bodyCategory ? this.props.exercise.bodyCategory.categoryName : ""}
            </label>
            <br />
            <label>
              Equipment: {this.props.exercise.equipmentType ? this.props.exercise.equipmentType.equipmentName : ""}
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
            <div className="links">
              <Link className="nav-link" to={`/exercises/${this.props.exercise.id}/edit`}>Edit</Link>
              <Link className="nav-link" to={`/home`} onClick={() => {this.props.deleteExercise(this.props.exercise.id)}}>Delete</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}