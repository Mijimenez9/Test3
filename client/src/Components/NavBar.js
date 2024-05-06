import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Sistema Administrador Lenguas Extranjeras</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/Registro' className="nav-link">Agendar</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/LoginScreen' className="nav-link">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/RegistroExamen' className="nav-link">Registrar Examen</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/Consulta' className="nav-link">Consulta</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
