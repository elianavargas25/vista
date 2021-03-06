import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <i className="material-icons">
                            assignment </i> Control De Finanzas Personales
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/ingresos" className="nav-link">Detalle Ingresos</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/egresos" className="nav-link">Detalle Egresos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/createIngreso" className="nav-link">Crear Ingreso</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/createEgresos" className="nav-link">Crear Egreso</Link>
                                
                            </li>

                            <li className="nav-item">
                                <Link to="/user" className="nav-link">Create User</Link>
                                
                            </li>
                            <li className="nav-item">
                                <Link to="/claveCambio" className="nav-link">Cambiar Contraseña</Link>
                                
                            </li>
                            <li className="nav-item">
                                <Link to="/movimiento" className="nav-link">Movimiento</Link>
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
