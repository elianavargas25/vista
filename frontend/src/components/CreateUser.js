import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        users: [],
        id: ''
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.get('https://finanzas-app.mileidyramos23171.now.sh/api/users');
        this.setState({
            users: res.data.data
           
        },
        console.log(this.setState));
        
    }

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }
    onChangeFirstName = e => {
        this.setState({
            firstName: e.target.value
        })
    }
    onChangeLastName = e => {
        this.setState({
            lastName: e.target.value
        })
    }
    onChangeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }


    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://finanzas-app.mileidyramos23171.now.sh/api/users', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            UserName: this.state.username,
            password: this.state.password
        });
        this.setState({ UserName: '' });
        this.getUsers();
    }

    deleteUser = async (userId) => {
        const response = window.confirm('are you sure you want to delete it?');
        if (response) {
            await axios.delete('https://finanzas-app.mileidyramos23171.now.sh/api/users' + userId);
            this.getUsers();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Nombres</label>
                                <input
                                    onChange={this.onChangeFirstName}
                                    className="form-control"
                                    type="text"
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellidos</label>
                                <input
                                    onChange={this.onChangeLastName}
                                    className="form-control"
                                    type="text"
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Correo Electrónico</label>
                                <input
                                    onChange={this.onChangeEmail}
                                    className="form-control"
                                    type="email"
                                    value={this.state.email}

                                />
                            </div>
                            <div className="form-group">
                                <label>Usuario</label>
                                <input
                                    onChange={this.onChangeUsername}
                                    className="form-control"
                                    type="text"
                                    value={this.state.username}
                                />
                            </div>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input
                                    onChange={this.onChangePassword}
                                    className="form-control"
                                    type="password"
                                    value={this.state.password}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                    </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action" key={user._id} 
                                onDoubleClick={() => this.deleteUser(user._id)}>
                                    {user.UserName}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
