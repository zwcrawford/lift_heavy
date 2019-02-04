import React, { Component } from "react"
import "./Exercise.css";
//import ExerciseCard from "../exercise/ExerciseCard";

class ExerciseList extends Component {
  render() {
    return (
      <section className="exercise">
        {this.props.exercises.map(exercise =>
          <article key={exercise.id}>
          {exercise.name}
          </article>
        )
        }
        </section>
    )
  }
}
export default ExerciseList