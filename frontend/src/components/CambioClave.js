import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateNote extends Component {

    state = {
        clave: '',
        claveNueva: '',
        claveNueva2: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                clave: res.data.clave,
                claveNueva: res.data.claveNueva,
                claveNueva2: res.data.claveNueva2,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedNote = {
                clave: this.state.clave,
                claveNueva: this.state.claveNueva,
                claveNueva2: this.state.claveNueva2
            };
            await axios.put('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/' + this.state._id, updatedNote);
        } else {
            // const newNote = {
            //     clave: this.state.clave,
            //     claveNueva: this.state.claveNueva,
            //     claveNueva2: this.state.claveNueva2,
            //     date: this.state.date
            // };
            await axios.post('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/', {
                clave: this.state.clave,
                claveNueva: this.state.claveNueva,
                claveNueva2: this.state.claveNueva2
            })

                .then(profile => alert('Ingreso create <3'))
                .catch(err => alert(err))
            //console.log(newNote)
        }
        window.location.href = '/';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date });
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
                                onChange={this.onInputChange}
                                value={this.state.clave}
                                required>
                             </input>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nueva Contraseña"
                                onChange={this.onInputChange}
                                name="claveNueva"
                                value={this.state.claveNueva}
                                required />
                        </div>
                        {/* Note Content */}

                        {/* Note Date */}
                        <div className="form-group">
                        <input
                                type="text"
                                className="form-control"
                                placeholder="Confirmar Contraseña"
                                onChange={this.onInputChange}
                                name="claveNueva2"
                                value={this.state.claveNueva}
                                required />
                            
                            </div>
                        <button className="btn btn-primary">
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
