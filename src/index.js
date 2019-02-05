import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Lift from './components/Lift'
import './index.css'

ReactDOM.render(
    <Router>
        <Lift />
    </Router>
    , document.getElementById('root'))
