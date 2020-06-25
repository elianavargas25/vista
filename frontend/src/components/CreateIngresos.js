import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateNote extends Component {

    state = {
        Description: '',
        valor: '',
        date: '',
        tipos: [],
        tipoSelected: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/categorias');
        if (res.data.length > 0) {
            this.setState({
                tipos: res.data.data
               // tipoSelected: res.data.data[0].tipo
            })                  
        }
       //console.log(tipos) 
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                Description: res.data.data.Description,
                valor: res.data.data.valor,
                date: res.data.data.date,
                tipoSelected: res.data.data.tipo,
                _id: res.data.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedIngreso = {
                Description: this.state.Description,
                valor: this.state.valor,
                tipo: this.state.tipoSelected,
                date: this.state.date
            };
            await axios.put('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/' + this.state._id, updatedIngreso);
        } else {
            await axios.post('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/', {
                Description: this.state.Description,
                valor: this.state.valor,
                tipo: this.state.tipoSelected,
                date: this.state.date
            })

                .then(profile => alert('Ingreso creado'))
                .catch(err => alert(err))
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
                    <h4>Nuevo Ingreso</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* SELECT THE USER */}
                        <div>
                        <label>Categoria</label>
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.tipoSelected}
                                onChange={this.onInputChange}
                                name="tipoSelected"
                                required>
                                {
                                     this.state.tipos.map(tipo => (
                                        <option key={tipo._id} value={tipo._id}>
                                            {tipo.tipo}
                                        </option>
                                    ))
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
                                assignment</i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
