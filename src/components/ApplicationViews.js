/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

/*
ApplicationViews will define all of the URLs that your application will support, and which routes will be displayed for each URL. In conjunction with the ExerciseManager, this is where all the data flows between the database and the application.

This is a Controller Component. Its responsible to control the behavior of the system. It maps URLs to components.
*/
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

Rules to keep in mind:
1. If you remove an item from a collection in state, then that element will not be rendered.
2. If you add an item to a collection in state, then it will be rendered.
3. If you modify an object that is used in your JSX, then it will be changed when the component is re-rendered.
4. State is reserved only for interactivity, that is, data that changes over time.
*/

/*
*** REACT HAS A ONE_WAY DATA FLOW ***
A unidirectional data flow means that when designing a React app you often nest child components within higher-order parent components. The parent component(s) will have a container for the state of your app (typically an immutable variable called state, unless you are using Redux or Flux, in which case you would encapsulate your app’s state in a store). The parent component typically passes down a snapshot of its state to its child components via read-only props and then the child components can communicate with the parent to update the state via callbacks which are bound to a button or form in the child component.

Here in my app, you’ll see the parent component and their various children. The main point is that the parent component is responsible for storing the state (in this case, the different unique exercises). The parent component, Lift.js, passes this state information down to its child component, ApplicationViews , via explicit props.
*/

/*
In this project, you will see components being exported immediately, instead of after the definition.

*************************************
My attempt at the Component Hierarchy:

index.js
  Lift
    ApplicationViews
      ExerciseList
        ExerciseAddForm
        ExerciseCard
          ExerciseEditForm
      NavBar (correct location?)
*************************************
 */
export default class ApplicationViews extends Component {

    // Use json-server to create an API for my application.
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
  /*
  Some of the code below uses the fetch API in JavaScript to query my API, then serializes the response as a JSON object, then take the JSON object and sets state.

  Just like a primitive value, such as a string or an integer, we can pass function references from a parent component to a child component. The child component can then specify when that functionality should be invoked, even though it was defined on its parent. The child's child can even reference the function from the child
  using the this.function() call.

  As you will see below, you are passing the function reference to the child component because that's where it will be invoked.
    - For example: getAllForUser={this.getAllForUser} is passed to <Login> which then takes getAllForUser() and runs it in its own handleUserLogin() function.
  */

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
    )
  }

  /* ********** EDIT EXERCISES ********** */
  /* MyNote [ZC - I read somewhere that patch might be better if I am not re-rendering the whole object (?)] */

  updateExercise = (exerciseId, editedExerciseObj) => {
    return ExerciseManager.put(exerciseId, editedExerciseObj)
    .then(() => this.getAllForUser(Number(sessionStorage.getItem("User")))
    )
  }

  /* ********** USER_LOGIN ********** */
  // I think this (updateComponent) was an early attempt at login and should most likely be removed. Again, waiting until approval is finalized but I think I abandoned this and ended up with getAllForUser() below instead.
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
  /*

  *** COMPONENT_DID_MOUNT ***
  - In React, retrieving state from a remote API works in, what seems like, a counter-intuitive way. React must first render the component to the DOM without any data, then you will request the data and re-render the component.

  - One of the life-cycle methods available to every React component is componentDidMount. Straight from their docs: componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.

  - If you need to load data from a remote endpoint, this is a good place to instantiate the network request. The componentDidMount() hook runs after the component output has been rendered to the DOM, so if your component needs API data, this is the place to do it.

  This is where we get the data after the components mount and where DOM nodes get initialized.
  */
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

    "/exercises" would match "/exercises/new" and also  "/exercises/:exerciseId(\d+)/edit" without "exact path". The point being, I think we are querying a path that begins with "/exercises". As several routes do start this way, which is bad, so set "exact path" for each and you will be ok.

    "/" would match all other routes without "exact path" included.

  Below I have five Routes setup:
    1. [exact path="/"] - This is the user login page.
    2. [exact path="/register"] - This is the user registration page.
    3. [exact path="/home"] - This is the home page where the exercise cards are listed.
    4. [exact path="/exercises/new"] - This is the Exercise Add Form.
    5. [path="/exercises/:exerciseId(\d+)/edit"] - This is the Exercise Edit Form.

  At the moment, I think I am passing all props to each route which may be unnecessary. That being said, I was under a fairly strict time constraint and did not want to chance having one in the wrong place or missing. I plan to clean all this up and make it more streamlined.

  *** Spread operator below (...) on all props. If you already have props as an object, and you want to pass it in JSX, you can use ... as a “spread” operator to pass the whole props object.
  This expansion means that each and every element in props is
    - A component with a render prop takes a function that returns a React element and calls it instead of
      implementing its own render logic.
    - React is pretty flexible but it has a single strict rule:
           ** All React components must act like pure functions with respect to their props (they are read-only).
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
        {/* Here, props are being passed to ExerciseList which will then be available for ExerciseCard */}
        <Route
          exact path="/home"
          render={props => {
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
