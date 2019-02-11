import { Route } from 'react-router-dom'
import React, { Component } from "react"
import ExerciseManager from "../modules/ExerciseManager";
import ExerciseList from './exercise/ExerciseList'
import ExerciseAddForm from './exercise/ExerciseAddForm'
import ExerciseEditForm from './exercise/ExerciseEditForm'
export default class ApplicationViews extends Component {
    state = {
      users: [],
      exercises: [],
      bodyCategories: [],
      equipmentTypes: [],
      categoryName: [],
      equipmentName: []
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

  /* ********** GET BODY CATEGORIES ********** */
  getAllBodyCategories() {
    return fetch("http://localhost:5002/bodyCategories")
    .then(e => e.json())
    .then(bodyCategories =>
      this.setState({
        bodyCategories: bodyCategories
      })
      )
    }

  /* ********** GET EQUIPMENT TYPES ********** */
  getAllEquipmentTypes() {
    return fetch("http://localhost:5002/equipmentTypes")
    .then(e => e.json())
    .then(equipmentTypes =>
      this.setState({
        equipmentTypes: equipmentTypes
      })
      )
    }

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
    .then(() => ExerciseManager.getAll())
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
    this.getAllBodyCategories()
    this.getAllEquipmentTypes()
  }
  render() {
    console.log("App View", this.state.exercises);

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
                addExercise={this.addExercise}
                bodyCategories={this.state.bodyCategories}
                equipmentTypes={this.state.equipmentTypes}
                  categoryName={this.state.categoryName}
                  updateExercise={this.updateExercise}
                 equipmentName={this.state.equipmentName}
                     exercises={this.state.exercises}
              />
            );
          }}
        />

        {/* this is the exerciseAddForm */}
        <Route
          exact path="/exercises/new"
          render={props => {
            return (
              <ExerciseAddForm
                {...props}
                deleteExercise={this.deleteExercise}
                addExercise={this.addExercise}
                bodyCategories={this.state.bodyCategories}
                equipmentTypes={this.state.equipmentTypes}
                  categoryName={this.state.categoryName}
                  updateExercise={this.updateExercise}
                 equipmentName={this.state.equipmentName}
                     exercises={this.state.exercises}
              />
            );
          }}
        />

        {/* this is the ExerciseEditForm */}
        <Route
            path="/exercises/:exerciseId(\d+)/edit"
            render={props => {
              return (
                <ExerciseEditForm
                  {...props}
                  deleteExercise={this.deleteExercise}
                addExercise={this.addExercise}
                bodyCategories={this.state.bodyCategories}
                equipmentTypes={this.state.equipmentTypes}
                  categoryName={this.state.categoryName}
                  updateExercise={this.updateExercise}
                 equipmentName={this.state.equipmentName}
                     exercises={this.state.exercises}
                />
              );
            }}
          />
      </React.Fragment>
    )
  }
}
