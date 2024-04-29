import React from 'react';
import './LoginScreen.css';
import logo from '../img/logo.png';
import building from '../img/building.jpg';
const LoginScreen = () => {
    return (

<div className="login-screen-container">
  {
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="row">
                <div className="col-md-6">
                    <div className="text-center mb-4">
                        <img src={logo} alt="Logo" className="img-fluid" />
                    </div>
                    <h1 className="text-center mb-4">Bienvenido!</h1>
                    <form className="mb-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control form-control-sm"
                                id="email"
                                placeholder="Introduce tu email"
                                input="true"
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
                                input="true"
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
                </div>
                <div className="col-md-6">
                    <img src={building} alt="Edificio" className="img-fluid" />
                </div>
            </div>
        </div>}
</div>
    )
}

export default LoginScreen;