const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/exercises/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/exercises?_expand=bodyCategory&_expand=equipmentType`).then(e => e.json());
  },
  post(newExercise) {
    return fetch(`${remoteURL}/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newExercise)
    }).then(data => data.json());
  },
  put(exerciseId, existingExercise) {
    return fetch(`${remoteURL}/${exerciseId}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(existingExercise)
      }).then(data => data.json());
  }
};