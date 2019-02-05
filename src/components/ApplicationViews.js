import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import ExerciseList from './exercise/ExerciseList'
import ExerciseManager from "../modules/ExerciseManager";

class ApplicationViews extends Component {
    state = {
      users: [],
      exercises: []
    }

/* ********** ADD EXERCISES ********** */
addExercise = exercise =>
  ExerciseManager.post(exercise)
  .then(() => ExerciseManager.getAll())
  .then(exercises =>
    this.setState({
      exercises: exercises
    })
  );

/* ********** DELETE EXERCISES ********** */
deleteExercise = id => {
  return fetch(`http://localhost:5002/exercises/${id}`, {
    method: "DELETE"
  })
  .then(e => e.json())
  .then(() => fetch(`http://localhost:5002/exercises`))
  .then(e => e.json())
  .then(exercises => this.setState({
    exercises: exercises

    })
  )
}

/* ********** EDIT EXERCISES ********** */
updateExercise = (exerciseId, editedTaskObj) => {
  return ExerciseManager.put(exerciseId, editedTaskObj)
  .then(e => e.json())
  .then(() => ExerciseManager.getAll())
  .then(e => e.json())
  .then(tasks => {
    this.setState({
      tasks: tasks
    })
  });
}

componentDidMount() {
  ExerciseManager.getAll().then(allExercises => {
    this.setState({
      exercises: allExercises
    });
  });
}

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <ExerciseList exercises={this.state.exercises} />
        }} />
      </React.Fragment>
        )
    }
}
export default ApplicationViews
