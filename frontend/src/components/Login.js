import '../App.css';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import App from '../App';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Cambio from "./CambioClave";

class ProfileLogin extends Component {

    state = {
        data: [],
        form: {
            UserName: '',
            password: ''
        },
        id:''
    }
/*state = {
    form: {
        UserName: '',
        password: ''
    },
    id:''
}*/

//state = {};

handleNameChange = e => {
    this.setState({ username: e.target.value });
}

handlePasswordChange = e => {
    this.setState({ password: e.target.value });
}

    handleSubmit = async (e,err) => {
    e.preventDefault();
    var data = "?username=" + this.state.username + "&password=" + this.state.password;
    console.log(data);
    const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/sesion/' + data)
    if(res){
        //alert('Succesful');
        ReactDOM.render(<App />, document.getElementById('root'));
        window.localStorage.setItem('user', JSON.stringify(res));
        console.log(res.data.data);
        
        
    }
    this.setState({
        id: res.data.data          
    });
        /*.then(profiles => {
            this.setState({
                user: res.data.data
            });
            console.log(this.state.user);
            ReactDOM.render(<App />, document.getElementById('root'));
            alert('log in successfully');
        })
        .catch(err => alert('Incorrect username or password'))
};*/
    }
render() {  
    const CambId = this.state.id;
    console.log("El cambio "+CambId);    
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h1 className="panel-title">Login</h1>
                            </div>
                            <div className="panel-body">
                                <form accept-charset="UTF-8" role="form">
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control"
                                                value={this.state.username}
                                                placeholder="*Usuario"
                                                name="name"
                                                id="user"
                                                type="text"
                                                required
                                                onChange={this.handleNameChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                id="pass"
                                                placeholder="*Contraseña"
                                                name="password"
                                                value={this.state.password}
                                                type="password"
                                                onChange={this.handlePasswordChange}
                                                required />
                                        </div>
                                        <div className="form-group">
                                        <a href="%">Cambio de contraseña</a>
                                        </div>

                                        <button onClick={this.handleSubmit} 
                                            className="btn btn-lg btn-success btn-block"
                                            type="submit"
                                            value="login">
                                            Iniciar Sesion</button>
                                    </fieldset>
                                </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                 
                </div>
                
            </div>
            

        </React.Fragment>
    )
}
}

export default ProfileLogin;