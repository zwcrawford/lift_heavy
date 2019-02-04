import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import ExerciseList from './exercise/ExerciseList'
import ExerciseManager from "../modules/ExerciseManager";

class ApplicationViews extends Component {
    state = {
        exercises: []
    }
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <ExerciseList exercises={this.state.exercises} />
                }} />
            </React.Fragment>
        )
    }
}
export default ApplicationViews
