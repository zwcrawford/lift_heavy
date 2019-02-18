import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Lift from './components/Lift'
import './index.css'

// The root component in this file, index.js, must now be <Router /> which gets imported from the React Router package. In that router, you place the <Lift /> child component. What this tells React is that "I will be placing Routes in my Lift component. I see this as the bottleneck through which the rest is accessible."

// Adding the render method and passing in two arguments: the Router component, and the location of where the render should happen: in the element with an Id of "root".

ReactDOM.render(
    <Router>
        <Lift />
    </Router>
    , document.getElementById('root'))