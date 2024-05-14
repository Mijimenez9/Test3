import React from 'react';
import './ExamConfirmation.css';

const ExamConfirmation = ({ location }) => {
    // Verifica si location y location.state están definidos
    if (!location || !location.state) {
        // Si no hay datos, redirige a la página de Registro o maneja el caso según tus necesidades
        return <p>No se han recibido datos del examen</p>;
    }

    const formValues = location.state; // Recibe los datos enviados desde Registro

    // Obtener la fecha y la hora de formValues
    const fechaExamen = formValues.fechaExamen ? new Date(formValues.fechaExamen) : null;
    const horaExamen = formValues.horaExamen;

    return (
        <div>
            <main>
                <h2>Gracias por agendar tu examen de inglés</h2>
                <strong>¡ATENCIÓN! Favor de llevar recibo de pago original.</strong>
                <h4>Has agendado tu examen de inglés con los siguientes detalles:</h4>
                <p>Llegar con 15 minutos de anticipación.</p>
                <h3>Datos de agenda:</h3>
                <p><strong>Fecha:</strong></p>
                {/* Mostrar la fecha si está definida */}
                {fechaExamen && (
                    <p>{fechaExamen.toLocaleDateString()}</p>
                )}
                <p><strong>Hora:</strong></p>
                {/* Mostrar la hora si está definida */}
                {horaExamen && (
                    <p>{horaExamen}</p>
                )}
                <h3>Ubicación</h3>
                <p><strong>Instituto Tecnológico de Tijuana</strong></p>
                <p>Calzada Del Tecnológico 5/7, Fraccionamiento Tomas Aquino, Tijuana, Baja California. Edificio de sistemas, debajo de laboratorio I.</p>
                <h3>Documentación Requerida</h3>
                <p>Recibo de pago, identificación oficial, lápiz, sacapuntas y borrador</p> 
                <div className="buttons">
                    <button onClick={() => window.history.go(-1)}>Atrás</button>
                    <button>Enviar</button>
                </div>
            </main>
            <footer>
            </footer>
        </div>
    );
}

export default ExamConfirmation;
