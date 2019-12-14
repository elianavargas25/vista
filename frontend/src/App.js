import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import NotesList from './components/Ingresos'
import CreateNote from './components/CreateIngresos'
import CreateUser from './components/CreateUser'
import CambiarClave from './components/CambioClave'
import CreateEgresos from './components/CreateEgresos'

import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" component={CreateNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/Egresos" component={CreateEgresos} />
        <Route path="/user" component={CreateUser} />
        <Route path="/claveCambio" component={CambiarClave} />
      </div>
    </Router>
  );
}

export default App;
