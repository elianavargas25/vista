import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import inicio from './components/Login'
import './App.css';

function Inicio() {
  return (
    <Router>
      <div className="container p-4">
        <Route path="/" exact component={inicio} />
      </div>
    </Router>
  );
}

export default Inicio;
