const remoteURL = "http://localhost:5002";

export default {
  // Get a specific exercise
  get(id) {
    return fetch(`${remoteURL}/exercises/${id}`).then(e => e.json());
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
  checkUserData(userEmailInput, userPassInput) {
    return fetch(`${remoteURL}/users?email=${userEmailInput}&password=${userPassInput}`)
  },
  // Get all exercises specific to a user
  getAllUserExercises() {
    let sessionUser = sessionStorage.getItem("email")
    let sessionEmail = Number(sessionUser)
    return fetch(`${remoteURL}/exercises?email=${sessionEmail}`)
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