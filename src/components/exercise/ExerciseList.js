import React, { Component } from "react"
//import ExerciseCard from "./ExerciseCard"
import ExerciseCard from "../exercise/ExerciseCard";

import "./Exercise.css";

class ExerciseList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="exerciseButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/exercises/new");
            }}
          >
            Add Exercise
          </button>
        </div>
      <section className="exercise">
      {this.props.exercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} {...this.props} />
          ))}
        </section>
        </React.Fragment>
    )
  }
}
export default ExerciseList