import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Exercise.css";

export default class ExerciseCard extends Component {
  render() {
    return (
      <div key={this.props.exercise.id} className="card">
        <div className="card-body">
          <h5 className="card-title">
            {this.props.exercise.name}
            <Link className="nav-link" to={`/exercises/${this.props.exercise.id}`}>
              Details
            </Link>
            <a
              href="/"
              onClick={() => this.props.deleteExercise(this.props.exercise.id)}
              className="card-link"
            >
              Delete
            </a>
          </h5>
        </div>
      </div>
    );
  }
}