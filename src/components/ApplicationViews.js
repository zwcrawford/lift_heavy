/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// ApplicationViews will define all of the URLs that your application will support, and which routes will be displayed for each URL.
// This is a Controller Component. Its only responsibility is to control the behavior of the system. It maps URLs to components.

import { Route } from 'react-router-dom'
import React, { Component } from "react"
import Login from './login_reg/Login'
import Registration from './login_reg/Registration'
import ExerciseManager from "../modules/ExerciseManager"
import ExerciseList from './exercise/ExerciseList'
import ExerciseAddForm from './exercise/ExerciseAddForm'
import ExerciseEditForm from './exercise/ExerciseEditForm'

/*    *** NOTES ON STATE ***
State is simply the current values of the properties used to render a component. You initialize state by defining a state at the top of your class definition. An important aspect of understanding why React works the way it does is to realize that its core mechanism is to express state as HTML. State is at the core of React. It drives everything. Including the HTML representation of that state via JSX. If you want to change the DOM that is being displayed to your customer, you change the state of the component. You must use the this.setState() method, and that method, in turn, invokes the render() method. Therefore, changing state this way, and only this way, modifies your DOM.
*/
/* Rules to keep in mind:
1. If you remove an item from a collection in state, then that element will not be rendered.
2. If you add an item to a collection in state, then it will be rendered.
3. If you modify an object that is used in your JSX, then it will be changed when the component is re-rendered.
*/
export default class ApplicationViews extends Component {

    // Setting state:
    state = {
      users: [],
      exercises: [],
      bodyCategories: [],
      equipmentTypes: [],
      categoryName: [],
      equipmentName: [],
      notes: "",
      exerciseName: "",
      userId: Number(sessionStorage.getItem("User"))
    }

  /* ********** ADD EXERCISES ********** */
  addExercise = exercise => {
    return ExerciseManager.post(exercise)
    .then(() => this.getAllForUser(Number(sessionStorage.getItem("User"))))
  }

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

  getAllForUser = (userId) => {
    return ExerciseManager.getAllForUser(userId)
    .then(exercises => {
      this.setState({
        exercises: exercises
      })
    })
  }

  componentDidMount() {
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
  /*
  In React, you will use something called a Router to handle rendering different components when the user clicks on navigation items.
  Below, notice that <React.Fragment /> is simply a React wrapper.
  Notice that "exact" is needed in some routes, otherwise they would also match other routes:

    "/exercises" would match "/exercises/new" and "/exercises/:exerciseId(\d+)/edit" without "exact path". The point being, I think we are querying a path that begins with "/exercises". As several routes do, which is bad, set "exact path".

    "/" would match all other routes without "exact path".
*/
  render() {
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
