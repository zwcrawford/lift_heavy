import React, { Component } from "react"
import ExerciseCard from "./ExerciseCard"
import "./Exercise.css";

export default class ExerciseList extends Component {

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
          >Add Exercise
          </button>
        </div>
        <section className="exercises">
          {this.props.exercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} {...this.props}
            />
          ))}
        </section>
      </React.Fragment>
    )
  }
}
