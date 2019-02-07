import { Route } from 'react-router-dom'
import React, { Component } from "react"
import ExerciseManager from "../modules/ExerciseManager";
import ExerciseList from './exercise/ExerciseList'
import ExerciseAddForm from './exercise/ExerciseAddForm'

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
    .then(e => e.json())
    .then(() => ExerciseManager.getAll())
    .then(e => e.json())
    .then(exercises => {
      this.setState({
        exercises: exercises
      })
    });
  }

  // // Write a ternary statement on the body categories after the render but before the return
  // getBodyCatToDOM(bodyCat) {
  //   return (bodyCat ? this.props.bodyCategory.categoryName : "")
  // }

  // // Do a ternary statement on the equipment names after the render but before the return
  // getEquipNameToDOM(equipName) {
  //   return (equipName ? this.props.equipmentType.equipmentName : "")
  // }

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
                bodyCategories={this.state.bodyCategories}
                equipmentTypes={this.state.equipmentTypes}
                exercises={this.state.exercises}
                categoryName={this.state.categoryName}
                equipmentName={this.state.equipmentName}
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
                bodyCategories={this.state.bodyCategories}
                equipmentTypes={this.state.equipmentTypes}
                exercises={this.state.exercises}
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
