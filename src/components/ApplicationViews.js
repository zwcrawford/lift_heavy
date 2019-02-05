import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import ExerciseManager from "../modules/ExerciseManager";
import ExerciseList from './exercise/ExerciseList'
import ExerciseAddForm from './exercise/ExerciseAddForm'

export default class ApplicationViews extends Component {
    state = {
      users: [],
      exercises: [],
      bodyCategories: [],
      equipmentTypes: []
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
  updateExercise = (exerciseId, editedExerciseObj) => {
    return ExerciseManager.put(exerciseId, editedExerciseObj)
    .then(e => e.json())
    .then(() => ExerciseManager.getAll())
    .then(e => e.json())
    .then(exercises => {
      this.setState({
        exercises: exercises
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

        {/* this is the list of exercises */}
        <Route
          exact path="/"
          render={props => {
            // if (this.isAuthenticated()) {
            return (
              <ExerciseList
                {...props}
                deleteExercise={this.deleteExercise}
                exercises={this.state.exercises}
              />
            );
          }}
        />

        {/* this is the exerciseAddForm */}
        <Route
          path="/exercises/new"
          render={props => {
            return (
              <ExerciseAddForm
                {...props}
                addExercise={this.addExercise}
              />
            );
          }}
        />

        {/* this is the ExerciseEditForm */}
        {/* <Route
            path="/exercises/:exerciseId(\d+)/edit"
            render={props => {
              return (
                <ExerciseEditForm
                  {...props}
                  updateExercise={this.updateExercise}/>
              );
            }}
          /> */}
      </React.Fragment>
    )
  }
}
