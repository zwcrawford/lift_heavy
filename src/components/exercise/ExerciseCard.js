/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// ExerciseCard holds exercise elements to be displayed based on the user who is logged in.
// This is a Presentation Component. Directly expresses HTML.

import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./Exercise.css";
/* I found it useful to include a commented version of my desired exercise format as a reference:

      "exercises": [
        {
            "id": 1,
            "userId": 1,
            "exerciseName": "squat",
            "bodyCategoryId": 9,
            "equipmentTypeId": 2,
            "sets": 1,
            "reps": 10,
            "weightLifted": 275,
            "notes": "Light. Go to 300 next time"
        },
*/

export default class ExerciseCard extends Component {

  /*
    *** RENDER ***
    - This is the output to the DOM on the ExerciseList. Each exercise is defined and contained within a card.
    - One method for conditionally rendering elements inline is to use the JavaScript conditional operator:

      condition ? true : false

      This was used for my two dropdown menus.

    - From either ExerciseAddForm or ExerciseEditForm, props are passed to the ExerciseCard to display.
  */
  render() {
    // console here
    //console.log("Test", this.props);

    return (
      <React.Fragment>
        <div key={this.props.exercise.id} className="exerciseCard">
          <div className="card-body">
            <label className="card-label card-title">
              Exercise:
            </label>
            <label className="card-output card-title">
              {this.props.exercise.exerciseName}
            </label>
            <br />
            <label className="card-label">
              Body Group:
            </label>
            <label className="card-output">
              {this.props.exercise.bodyCategory ? this.props.exercise.bodyCategory.categoryName : ""}
            </label>
            <br />
            <label className="card-label">
              Equipment:
            </label>
            <label className="card-output">
              {this.props.exercise.equipmentType ? this.props.exercise.equipmentType.equipmentName : ""}
            </label>
            <br />
            <label className="card-label">
              # of Sets:
            </label>
            <label className="card-output">
              {this.props.exercise.sets}
            </label>
            <br />
            <label className="card-label">
              # of Reps:
            </label>
            <label className="card-output">
              {this.props.exercise.reps}
            </label>
            <br />
            <label className="card-label">
              Weigh / Rep:
            </label>
            <label className="card-output">
              {this.props.exercise.weightLifted}
            </label>
            <br />
            <label className="card-label">
              Notes:
            </label>
            <label className="card-output">
              {this.props.exercise.notes}
            </label>
            {/* The <Link/> component from the React Router package installed has an attribute named "to". It will render a hyperlink in your DOM, and when clicked, it will change the URL in the browser to the value of the to attribute. */}
            <div className="card-links">
                <Link className="card-link" to={`/exercises/${this.props.exercise.id}/edit`}>Edit</Link>
                <Link className="card-link" to={`/home`} onClick={() => this.props.deleteExercise(this.props.exercise.id)}>Delete</Link>
            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}