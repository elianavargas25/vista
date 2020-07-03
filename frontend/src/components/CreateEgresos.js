import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import ReactDOM from 'react-dom';
import App from '../App';

export default class CreateEgresos extends Component {

    state = {
        Description: '',
        valor: '',
        date: '',
        categorias: [],
        tipos: [],
        categoriaSelected: '',
        tipoSelected: '',
        editing: false,
        _id: '',
        _idUser: ''
    }

    async componentDidMount() {
        this.getTipo();
        this.getCategoria();
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            this.getEgresos();
        }
    }

    getTipo = async () => {
        const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/tipos/')
        this.setState({
            tipos: res.data.data,
            tipoSelected: res.data.data[0].tipo
        });
    }

    getCategoria = async () => {
        const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/categorias/')
        this.setState({
            categorias: res.data.data,
            categoriaSelected: res.data.data[0].categoria
        });
    }

    getEgresos = async () => {
        const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/egresos/' + this.props.match.params.id);
        console.log(res.data.data);
        this.setState({
            Description: res.data.data.Description,
            valor: res.data.data.valor,
            date: new Date(res.data.data.date),
            categoriaSelected: res.data.data.categoria,
            tipoSelected: res.data.data.tipo,
            _id: res.data.data._id,
            _idUser: res.data.data._idUser,
            editing: true
        });
    }

    onSubmit = async (e) => {
        const dataLocal = JSON.parse(window.localStorage.getItem('user'));
        const idUser = dataLocal.data.data._id

        e.preventDefault();
        if (this.state.editing) {
            const updatedNote = {
                Description: this.state.Description,
                valor: this.state.valor,
                categoria: this.state.categoria,
                tipo: this.state.tipo,
                date: this.state.date,
                _idUser: idUser
            };
            await axios.put('https://finanzas-app.mileidyramos23171.now.sh/api/egresos/' + this.state._id, updatedNote);
        } else {
            await axios.post('https://finanzas-app.mileidyramos23171.now.sh/api/egresos/', {
                Description: this.state.Description,
                valor: this.state.valor,
                categoria: this.state.categoria,
                tipo: this.state.tipo,
                date: new Date(),
                _idUser: idUser
            })

                .then(profile => {
                    ReactDOM.render(<App />, document.getElementById('root'));
                    alert('Egreso creado')
                })
                .catch(err => alert(err))
        }
        window.location.href = '/egresos';

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
                    <center>  <h5>Nuevo Egreso</h5> </center>
                    <form onSubmit={this.onSubmit}>
                        {/* SELECT THE USER */}
                        <div>
                            <label>Tipo Egreso</label>
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.tipoSelected}
                                onChange={this.onInputChange}
                                name="tipo"
                                required>
                                {
                                    this.state.tipos.map(tipo => (
                                        <option key={tipo._id} value={tipo.tipo}>
                                            {tipo.tipo}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label>Categoria</label>
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.categoria}
                                onChange={this.onInputChange}
                                name="categoria"
                                required>
                                {
                                    this.state.categorias.map(categoria => (
                                        <option key={categoria._id} value={categoria.categoria}>
                                            {categoria.categoria}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Note Title */}
                        <div>
                            <label>Descripción</label>
                        </div>
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
                        <div>
                            <label>Valor</label>
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
                        <div>
                            <label>Fecha</label>
                        </div>
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
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
