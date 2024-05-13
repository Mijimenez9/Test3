import React from 'react';
import './ExamConfirmation.css'; // Asegúrate de importar el archivo CSS correctamente

function ExamConfirmation() {
    return (
        <div>
            <main>
                <h2>Gracias por agendar tu examen de inglés</h2>
                <strong>¡ATENCIÓN! Favor de llevar recibo de pago original.</strong>
                <h4>Has agendado tu examen de inglés con los siguientes detalles:</h4>
                <p>Llegar con 15 minutos de anticipación.</p>
                <h3>Datos de agenda:</h3>
                <p><strong>Fecha:</strong></p>
                <p>(Agregar fecha)</p>
                <p><strong>Hora:</strong></p>
                <p>(Agregar Hora)</p>
                <h3>Ubicación</h3>
                <p><strong>Instituto Tecnológico de Tijuana</strong></p>
                <p >Calzada Del Tecnológico 5/7, Fraccionamiento Tomas Aquino, Tijuana, Baja California. Edificio de sistemas, debajo de laboratorio I.</p>
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