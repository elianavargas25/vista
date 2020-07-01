import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class EgresosList extends Component {

    state = {
        egresos: []
    }

    async componentDidMount() {
        this.getEgresos();
    }

    getEgresos = async () => {
        const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/egresos/')
        this.setState({
            egresos: res.data.data
        });
    }

    deleteEgreso = async (egresoId) => {
        await axios.delete('https://finanzas-app.mileidyramos23171.now.sh/api/egresos/' + egresoId);
        this.getEgresos();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.egresos.map(egreso => (
                        <div className="col-md-4 p-2" key={egreso._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{egreso.categoria}</h5>
                                    <Link to={"/edit/" + egreso._id} className="btn btn-secondary">
                                        <i className="material-icons">
                                            border_color</i>
                                    </Link>
                                </div>
                                <div className="card-body">

                                    <p>
                                        Tipo: {egreso.tipo}
                                    </p>
                                    <p>
                                        Valor: {egreso.valor}
                                    </p>
                                    <p>
                                        Descripción: {egreso.Description}
                                    </p>
                                    <p>
                                        Fecha:  {(egreso.date)}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(egreso._id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
