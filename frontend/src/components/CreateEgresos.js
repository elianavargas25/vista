import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateNote extends Component {

    state = {
        Description: '',
        valor: '',
        date: new Date(),
        categoria: '',
        tipo: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                Description: res.data.Description,
                valor: res.data.valor,
                date: new Date(res.data.date),
                categoria: res.data.tipo,
                tipo: res.data.tipo,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedNote = {
                Description: this.state.Description,
                valor: this.state.valor,
                categoria: this.state.tipo,
                tipo: this.state.tipo,
                date: this.state.date
            };
            await axios.put('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/' + this.state._id, updatedNote);
        } else {
            // const newNote = {
            //     Description: this.state.Description,
            //     valor: this.state.valor,
            //     tipo: this.state.tipo,
            //     date: this.state.date
            // };
            await axios.post('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/', {
                Description: this.state.Description,
                valor: this.state.valor,
                categoria: this.state.tipo,
                tipo: this.state.tipo,
                date: this.state.date
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
                    <h4>Nuevo Egreso</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* SELECT THE USER */}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.tipo}
                                onChange={this.onInputChange}
                                name="tipo"
                                required>
                                {
                                    <option value={1}>
                                        Fijo
                                        </option>
                                       

                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.categoria}
                                onChange={this.onInputChange}
                                name="categoria"
                                required>
                                {
                                    <option value={1}>
                                        gastos
                                        </option>
                                       

                                }
                            </select>
                        </div>
                        {/* Note Title */}
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Descripción"
                                name="Description"
                                onChange={this.onInputChange}
                                value={this.state.Description}
                                required>
                            </textarea>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Valor"
                                onChange={this.onInputChange}
                                name="valor"
                                value={this.state.valor}
                                required />
                        </div>
                        {/* Note Content */}

                        {/* Note Date */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Save <i className="material-icons">
                                assignment
</i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
