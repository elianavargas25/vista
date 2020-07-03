import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
//import '../dist/anychart-react.min.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import AnyChart from  'anychart-react/dist/anychart-react.min.js'


import Navigation from './components/Navigation'
import ListIngresos from './components/Ingresos'
import ListEgresos from './components/egresos'
import CreateIngresos from './components/CreateIngresos'
import CreateUser from './components/CreateUser'
import CambiarClave from './components/CambioClave'
import CreateEgresos from './components/CreateEgresos'
import inicio from './components/Login'
import movimiento from './components/Movimientos'

import './App.css';

function App() {
  return (
    
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/ingresos" exact component={ListIngresos} />
        <Route path="/egresos" exact component={ListEgresos} />
        <Route path="/editIngreso/:id" component={CreateIngresos} />
        <Route path="/createIngreso" component={CreateIngresos} />
        <Route path="/createEgresos" component={CreateEgresos} />
        <Route path="/editEgreso/:id" component={CreateEgresos} />
        <Route path="/user" component={CreateUser} />
        <Route path="/claveCambio" component={CambiarClave} />
        <Route path="/movimiento" component={movimiento} />
      </div>

      <Route path="/" exact component={inicio} />
    </Router>

  );
}
ReactDOM.render(
  <AnyChart
      type="pie"
      data={[1, 2, 3, 4]}
      title="Simple pie chart"
  />, document.getElementById('root'));

export default App;
