import React from 'react';
import App from './App';
import Hello from './hello'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Task() {
  return (
    <Router>
      <Route exact path='/'>
        <App />
      </Route>
      <Route path='/taskr'>
        <Hello/>
      </Route>
    </Router>
  )
}

export default Task
