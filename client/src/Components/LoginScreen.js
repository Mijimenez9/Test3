import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importa las bibliotecas necesarias
import './LoginScreen.css';
import logo from '../img/logo.png';
import building from '../img/building.jpg';
import Consulta from './Consulta';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [redirectToConsulta, setRedirectToConsulta] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Lógica para verificar las credenciales con el backend
            // Si las credenciales son correctas, establece redirectToConsulta a true
            setRedirectToConsulta(true);
        } catch (err) {
            // Si hay un error al iniciar sesión, muestra una alerta
            setError('Usuario o contraseña incorrectos');
            console.error(err);
        }
    };

    // Si redirectToConsulta es true, redirige al usuario a la página Consulta
    if (redirectToConsulta) {
        return <Navigate to="/Consulta" replace />;
    }

    return (
        <div className="login-screen-container">
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center mb-4">
                            <img src={logo} alt="Logo" className="img-fluid" />
                        </div>
                        <h1 className="text-center mb-4">Bienvenido!</h1>
                        <form className="mb-4" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    placeholder="Introduce tu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    id="password"
                                    placeholder="Introduce tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Recordar credenciales
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-2">
                                Iniciar sesión
                            </button>
                            <button type="button" className="btn btn-dark btn-block mb-2">
                                Regresar
                            </button>
                        </form>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    </div>
                    <div className="col-md-6">
                        <img src={building} alt="Edificio" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
