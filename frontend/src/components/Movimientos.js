import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import AnyChart from 'anychart-react/dist/anychart-react.min.js';

class Movimiento extends React.Component {
    state = {
        valor: '',
        tipos: ''
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/ingresos/' + this.props.match.params.id);
          
            this.setState({
                valor: res.data.valor,
                tipo: res.data.tipo
            });
        }
    }

    render() {
        return (
            <React.Fragment>

                <AnyChart
                    {...complexSettings}
                />
            </React.Fragment>
        )
    }
}

const complexSettings = {
    width: 800,
    height: 600,
    type: 'column',
    data: "P1,5\nP2,3\nP3,6\nP4,4",
    title: 'Ingresos',
    yAxis: [1, {
        orientation: 'right',
        enabled: true,
        labels: {
            format: '{%Value}{decimalPoint:\\,}',
            fontColor: 'red'
        }
    }],
    legend: {
        background: 'lightgreen 0.4',
        padding: 0
    },
    lineMarker: {
        value: 4.5
    }
};


export default Movimiento;