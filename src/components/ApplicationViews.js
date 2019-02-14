import { Route } from 'react-router-dom'
import React, { Component } from "react"
import Login from './login_reg/Login'
import Registration from './login_reg/Registration'
import ExerciseManager from "../modules/ExerciseManager"
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
      equipmentName: [],
      userId: Number(sessionStorage.getItem("User"))
    }

  /* ********** ADD EXERCISES ********** */
  addExercise = exercise =>
    ExerciseManager.post(exercise)
    .then(() => this.getAllForUser(Number(sessionStorage.getItem("User"))))


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
    .then(() => this.getAllForUser(Number(sessionStorage.getItem("User")))
    //.then(e => e.json())
    )
  }

  /* ********** EDIT EXERCISES ********** */
  updateExercise = (exerciseId, editedExerciseObj) => {
    return ExerciseManager.put(exerciseId, editedExerciseObj)
    .then(() => this.getAllForUser(Number(sessionStorage.getItem("User")))
    )
  }

  /* ********** USER LOGIN ********** */
  updateComponent = () => {
    ExerciseManager.getAllUserExercises()
    .then(exercises => {
      this.setState({
        exercises: exercises
      })
    })
  }
  /* PASSING TO LOGIN & REGISTRATION.JS */
  postUser = newUser => {
    return ExerciseManager.postUser(newUser)
  }
  checkUserData(email, password) {
    return ExerciseManager.checkUserData(email, password)
  }
  // getAllUserExercises(userId) {
  //   return ExerciseManager.getAllUserExercises(userId)
  //   .then(userId => {
  //     this.setState({
  //       userId: userId
  //     })
  //   })
  // }
  getAllForUser = (userId) => {
    return ExerciseManager.getAllForUser(userId)
    .then(exercises => {
      this.setState({
        exercises: exercises
      })
    })
  }

  componentDidMount() {
    // ExerciseManager.getAll().then(allExercises => {
    //   this.setState({
    //     exercises: allExercises
    //   });
    // });
    ExerciseManager.getAllUsers()
    .then(users => {
      this.setState({
        users: users
      })
    })
    this.getAllBodyCategories()
    this.getAllEquipmentTypes()
    this.getAllForUser(Number(sessionStorage.getItem("User"))
    )
  }

  render() {
    //console.log("App View", this.state.exercises);

    return (
      <React.Fragment>

        {/* this is the login page */}
        <Route
          exact path="/"
          render={props => {
            return (
              <Login
                {...props}
                          postUser={this.postUser}
                              users={this.state.users}
                    updateComponent={this.updateComponent}
                    deleteExercise={this.deleteExercise}
                        addExercise={this.addExercise}
                    bodyCategories={this.state.bodyCategories}
                    equipmentTypes={this.state.equipmentTypes}
                      categoryName={this.state.categoryName}
                    updateExercise={this.updateExercise}
                      equipmentName={this.state.equipmentName}
                          exercises={this.state.exercises}
                    handleUserLogin={this.handleUserLogin}
                      checkUserData={this.checkUserData}
                getAllUserExercises={this.getAllUserExercises}
                      getAllForUser={this.getAllForUser}
              />
            );
          }}
        />

        {/* this is the registration page */}
        <Route
          exact path="/register"
          render={props => {
            return (
              <Registration
                {...props}
                          postUser={this.postUser}
                              users={this.state.users}
                    updateComponent={this.updateComponent}
                    deleteExercise={this.deleteExercise}
                        addExercise={this.addExercise}
                    bodyCategories={this.state.bodyCategories}
                    equipmentTypes={this.state.equipmentTypes}
                      categoryName={this.state.categoryName}
                    updateExercise={this.updateExercise}
                      equipmentName={this.state.equipmentName}
                          exercises={this.state.exercises}
                    handleUserLogin={this.handleUserLogin}
                      checkUserData={this.checkUserData}
                getAllUserExercises={this.getAllUserExercises}
                      getAllForUser={this.getAllForUser}
              />
            );
          }}
        />

        {/* this is the list of exercises */}
        <Route
          exact path="/home"
          render={props => {
            // if (this.isAuthenticated()) {
            return (
              <ExerciseList
                {...props}
                       postUser={this.postUser}
                          users={this.state.users}
                updateComponent={this.updateComponent}
                 deleteExercise={this.deleteExercise}
                    addExercise={this.addExercise}
                 bodyCategories={this.state.bodyCategories}
                 equipmentTypes={this.state.equipmentTypes}
                   categoryName={this.state.categoryName}
                 updateExercise={this.updateExercise}
                  equipmentName={this.state.equipmentName}
                      exercises={this.state.exercises}
                    getAllUsers={this.state.users}
                handleUserLogin={this.handleUserLogin}
                  checkUserData={this.checkUserData}
                  getAllUserExercises={this.getAllForUser}
                  getAllForUser={this.getAllForUser}
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
                       postUser={this.postUser}
                          users={this.state.users}
                updateComponent={this.updateComponent}
                 deleteExercise={this.deleteExercise}
                    addExercise={this.addExercise}
                 bodyCategories={this.state.bodyCategories}
                 equipmentTypes={this.state.equipmentTypes}
                   categoryName={this.state.categoryName}
                 updateExercise={this.updateExercise}
                  equipmentName={this.state.equipmentName}
                      exercises={this.state.exercises}
                    getAllUsers={this.state.users}
                handleUserLogin={this.handleUserLogin}
                  checkUserData={this.checkUserData}
                  getAllUserExercises={this.getAllUserExercises}
                  getAllForUser={this.getAllForUser}
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
                       postUser={this.postUser}
                          users={this.state.users}
                updateComponent={this.updateComponent}
                 deleteExercise={this.deleteExercise}
                    addExercise={this.addExercise}
                 bodyCategories={this.state.bodyCategories}
                 equipmentTypes={this.state.equipmentTypes}
                   categoryName={this.state.categoryName}
                 updateExercise={this.updateExercise}
                  equipmentName={this.state.equipmentName}
                      exercises={this.state.exercises}
                    getAllUsers={this.state.users}
                handleUserLogin={this.handleUserLogin}
                  checkUserData={this.checkUserData}
                  getAllUserExercises={this.getAllUserExercises}
                  getAllForUser={this.getAllForUser}
              />
              );
            }}
          />
      </React.Fragment>
    )
  }
}
