import React from 'react';
import './inicio.css';
import { Link } from 'react-router-dom';
import lenguasImg from '../img/lenguas.jpg';
import estudiarImg from '../img/estudiar.jpg';
import contactoImg from '../img/contacto.jpg';
import alertaimg from '../img/alerta.png';
import dondeimg from '../img/donde.jpg';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <div>
        <img src={lenguasImg} className="d-block img-fluid mx-auto" alt="Lenguas extranjeras" style={{ maxWidth: '55%', Height: 'auto' }} />
      </div>

      {/* Botón Agendar  */}
      <div className="agendar-btn-container" style={{ textAlign: 'center', marginTop: '20px' }}> 
        <Link to="/Registro" className="btn btn-primary" >Agendar</Link> <br/><br/>{/* Botón que usa Link */}
      </div>
      <h2 style={{ textAlign: 'center', fontSize: '35px', marginTop: '20px' }}>Información adicional</h2>

      <div className="cards-container">
        {/* Contenedor de tarjetas */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>

          {/* Primera tarjeta */}

          <div className="card" style={{ width: '18rem' }}>
            <img src={estudiarImg} className="card-top" alt="Card" />
            <div className="card-body">
              <h5 className="card-title">Mide tu nivel de inglés</h5>
              <p className="card-text">Aqui puedes acceder a un test de prueba.</p>
              <a href="#" className="btn btn-primary">Ir</a>
            </div>
          </div>


          {/* Segunda tarjeta */}
          <div className="card" style={{ width: '18rem' }}>
            <img src={contactoImg} className="card-top" alt="Card" />
            <div className="card-body">
              <h5 className="card-title">Contacto</h5>
              <p className="card-text">idiomas@tectijuana.edu.mx <br/>
                607-84-00 ext 179</p>
              <a href="#" className="btn btn-primary">Ir</a>
            </div>
          </div>


          {/* Tercera tarjeta */}
          <div className="card" style={{ width: '18rem' }}>
            <img src={alertaimg} className="card-top" alt="Card" />
            <div className="card-body">
              <h5 className="card-title">Avisos Importantes</h5>
              <p className="card-text">Aqui podras ver los avisos o eventos importantes.</p>
              <a href="#" className="btn btn-primary">Ir</a>
            </div>
          </div>

          {/* Cuarta tarjeta */}
          <div className="card" style={{ width: '18rem' }}>
            <img src={dondeimg} className="card-top" alt="Card" />
            <div className="card-body">
              <h5 className="card-title">Preguntas Frecuentes</h5>
              <p className="card-text">Aqui podras resolver algunas de tus dudas.</p>
              <a href="#" className="btn btn-primary">Ir</a>
            </div>
          </div>
        </div>
      </div>
      {/* Primera nueva sección */}
      <div className="seccion">
        <div className="container">
          <h2></h2>
          <p>
          </p>
        </div>
      </div>

      {/* Segunda nueva sección */}
      <div className="seccion" style={{ textAlign: 'center', fontSize: '35px', marginTop: '20px' }}>
        <div className="container">
          <h2>Agenda Tu Examen Hoy</h2>
          <p></p>
          {/* Botón Agendar  */}
          <div className="agendar-btn-container" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/Registro" className="btn btn-primary">Agendar</Link> {/* Botón que usa Link */}
          </div>
        </div>
      </div>

    </div>


  );
};
export default Inicio;
