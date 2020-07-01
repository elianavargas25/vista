import '../App.css';
import ReactDOM from 'react-dom';
import App from '../App';
import React from 'react';
import axios from 'axios';

class ProfileLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            form: {
                UserName:'',
                password:''
            }
        }
    }
    
    state = {}; 

    handleNameChange = e => {
        this.setState({username: e.target.value});
    }

    handlePasswordChange = e => {
        this.setState({password: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        var data = "?username="+this.state.username+"&password="+this.state.password;
        console.log(data);
        axios.get('http://localhost:3000/api/sesion/'+data)
            .then(profiles => {
                ReactDOM.render(<App />, document.getElementById('root'));
            alert('log in successfully');
        })
            .catch(err => alert('Incorrect username or password'))
    };

    render() {
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
                                                <a href="#" placeholder="Cambiar contraseña">Cambiar contraseña</a>
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