const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/exercises/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/exercises`).then(e => e.json());
  },
  post(newAnimal) {
    return fetch(`${remoteURL}/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newExercise)
    }).then(data => data.json());
  }
};