import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css'
import login from './Login'
import axios from 'axios'

const CreateNote = () => {

    const [changePassword, setChangePassword] = useState({
        password: '',
        password2: '',
        newPassword: '',
    });

    const [dataLocalStorage, setDataLocalStorage] = useState(null);

    useEffect(() => {
        const dataLocal = JSON.parse(window.localStorage.getItem('user'));
        setDataLocalStorage(dataLocal)
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        const passwordBack = dataLocalStorage.data.data.password;
        const passwordActual = changePassword.password;
        const passwordNueva = changePassword.password2;
        const passwordNueva2 = changePassword.newPassword;
        const id = dataLocalStorage.data.data._id;
        let URI = "http://localhost:3000/api/cambio/" + id;

        if (passwordBack !== passwordActual) {
            alert('Contraseña incorrecta')
        }

        if (passwordNueva !== passwordNueva2) {
            alert('Las contraseñas no coinciden')
        }

        if (passwordBack === passwordActual && passwordNueva === passwordNueva2) {
            axios.put(URI, {
                password:passwordNueva
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }else{
            console.log('NO entro')
        }

    }

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>Cambiar Contraseña</h4>
                <form onSubmit={onSubmit}>
                    {/* SELECT THE USER */}

                    {/* Note Title */}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Contraseña Actual"

                            onChange={(event) => {
                                setChangePassword({
                                    ...changePassword,
                                    password: event.target.value
                                })
                            }}
                            required
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nueva Contraseña"
                            onChange={(event) => {
                                setChangePassword({
                                    ...changePassword,
                                    password2: event.target.value
                                })
                            }}
                            required />
                    </div>
                    {/* Note Content */}

                    {/* Note Date */}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Confirmar Contraseña"
                            onChange={(event) => {
                                setChangePassword({
                                    ...changePassword,
                                    newPassword: event.target.value
                                })
                            }}
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
    );
}

export default CreateNote;

