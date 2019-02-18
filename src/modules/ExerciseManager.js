/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// ExerciseManager will house the fetch calls that my application requires, and which routes will be displayed for each URL.
// This is a Controller Component. Its only responsibility is to provide the fetch calls required by components to display the desired data..

/*
Here I am introducing data to my application. As it is generally considered poor-practice to mix your views with application behavior, while views need to receive data to render it, they shouldn’t know where the data came from, how it changes, or how to create it.
*/

/*    NOTES ON JSON.stringify()
A common use of JSON is to exchange data to/from a web server. When sending data to a web server, the data has to be a string.
- Convert a JavaScript object into a string with JSON.stringify(obj).
- Convert a JavaScript array into a string with JSON.stringify(arr).
* Date objects are not allowed. The JSON.stringify() function will convert any dates into strings.
* Function objects are not allowed. The JSON.stringify() function will remove any functions from a JavaScript object, both the key and the value

      NOTES ON promise conversion
- Promises (or a `fetch`) is just a fancy Promise and `then()` is used after to render the entries to the DOM.
- When you need to ensure that a series of asynchronous operations is performed in a specific order, you need to use promises.
*/

// Declare a reusable variable to the root URL of the json server:
const remoteURL = "http://localhost:5002";

export default {
  // Get a specific exercise
  get(id) {
    return fetch(`${remoteURL}/exercises/${id}`).then(e => e.json());
  },
  //Get user by id
  getUsers(id) {
    return fetch(`${remoteURL}/users/${id}`).then(e => e.json())
  },
  // Get all exercises
  getAll() {
    return fetch(`${remoteURL}/exercises?_expand=bodyCategory&_expand=equipmentType`).then(e => e.json());
  },
  // Get all users
  getAllUsers() {
    return fetch(`${remoteURL}/users`)
    .then(e => e.json());
  },
  // Get email and password to verify user
  checkUserData(email, password) {
    return fetch(`${remoteURL}/users?email=${email}&password=${password}`)
    .then(e => e.json());
  },
  // Get all exercises by user.
  getAllForUser(id) {
    return fetch(`${remoteURL}/exercises?userId=${id}&_expand=bodyCategory&_expand=equipmentType`)
    .then(e => e.json());
  },
  // Post new user
  postUser(newUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
      }).then(data => data.json());
    },
  // Post new exercise
  post(exercise) {
    return fetch(`${remoteURL}/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exercise)
    }).then(data => data.json());
  },
  // Edit exercise
  put(exerciseId, existingExercise) {
    return fetch(`${remoteURL}/exercises/${exerciseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(existingExercise)
      }).then(data => data.json());
  }
};