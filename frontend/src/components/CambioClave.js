import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import login from './Login'
import axios from 'axios'

export default class CreateNote extends Component {

    state = {
        clave: '',
        claveNueva: '',
        claveNueva2: '',
        editing: false,
        _id: ''
    }

    

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Cambiar Contraseña</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* SELECT THE USER */}
                        
                        {/* Note Title */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Contraseña Actual"
                                name="clave"
                                //onChange={this.onInputChange}
                                //value={this.state.clave}
                                required>
                             </input>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nueva Contraseña"
                                //onChange={this.onInputChange}
                                name="claveNueva"
                                //value={this.state.claveNueva}
                                required />
                        </div>
                        {/* Note Content */}

                        {/* Note Date */}
                        <div className="form-group">
                        <input
                                type="text"
                                className="form-control"
                                placeholder="Confirmar Contraseña"
                                //onChange={this.onInputChange}
                                name="claveNueva2"
                               // value={this.state.claveNueva}
                                required />
                            
                            </div>
                        <button className="btn btn-primary" onClick={this.onSubmit}>
                            Guardar <i className="material-icons">
                                assignment
</i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
