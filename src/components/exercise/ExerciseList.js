/************************************
* Author: Zac Crawford
* Start Date: 02.09.19
* Hit MVP Date: 02.15.19
* Repository: https://github.com/zwcrawford/lift_heavy
* Project Type: CRUD React
*
************************************/

// ExerciseList is where the ExerciseCards will display after an exercise is created
// This is a Presentation Component. It directly expresses HTML.

// 1. Aside from setting up the db, this was my starting point, the first page I had loading on the DOM.


import React, { Component } from "react"
import NavBar from "../nav/NavBar"
import ExerciseCard from "./ExerciseCard"
import "./Exercise.css";

// 2. Here is the first subclass I created from the existing Component base class
export default class ExerciseList extends Component {

  // There is a single "render" method here.
  render() {
    return (
      /*
      It returns an HTML representation of data using JSX elements. Note that there
      can only be one total fragment that all other children are contained within. You can consider each one of your components as a factory function. It's just a function that returns an object.
      */
      <React.Fragment>

        {/* Locating the NavBar at the top of every page that needs it. */}
        <NavBar />

        {/* "Add Exercise" button at top of DOM but below NavBar. */}
        {/* When the "Add Exercise" button is clicked, it will open a new page that contains the form to add a new exercise - ExerciseAddForm.js */}
        <div className="exerciseButton">
          <button
            type="button"
            id="addExerBtn"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/exercises/new");
            }}
          >Add Exercise
          </button>
        </div>
        {/* This is the area for displaying the exercise cards on DOM under button. */}
        <section className="exercises">

        {/* JSX interprets "ExerciseCard" as a component and will render the class defined in its own file - ExerciseCard.js */}
        {/* There are 2 starter exercise objects in the exercises array so the map() array method can convert the raw data into HTML elements. */}
        {/* The map() method creates a new array with the results of calling a provided function on every element in the calling array. */}
          {this.props.exercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} {...this.props}
            />
          ))}
        </section>
      </React.Fragment>
    )
  }
}
