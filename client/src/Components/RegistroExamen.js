import React, { useState } from "react";
import { Container, Card, Form } from "react-bootstrap";
import CalendarioAdmin from "./CalendarioAdmin";
import "./RegistroExamen.css";

const RegistroExamen = () => {
  const [formValues, setFormValues] = useState({
    fechaExamen: null,
    horaExamen: null,
    cupoMaximo: 0,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado: ", formValues);

    // Aquí puedes implementar la lógica para enviar los datos a la base de datos
  };

  return (
    <div className="registro-examen">
      <Container className="my-5">
        <h2>Registro de Nuevos Examenes</h2>

        <Card>
          <Card.Body>
            <h5>Registrar Nuevo Examen</h5>
            <form onSubmit={handleSubmit}>
              <div className="campo">
                <h3>Fecha de Examen:</h3>
                
                <CalendarioAdmin
                
                  selectedDate={formValues.fechaExamen}
                  onDateChange={(date) =>
                    setFormValues((prevState) => ({
                      ...prevState,
                      fechaExamen: date,
                    }
                  
                  ))
                  }
                />
              </div>
              {formValues.fechaExamen && (
                <div>
                  <h3>Selecciona una hora:</h3>
                  <select
                    id="horaExamen"
                    value={formValues.horaExamen}
                    onChange={handleInputChange}
                    required
                  >
                    {/* Aquí se mostrarán las horas disponibles */}
                    <option value="">Selecciona una hora</option>
                    <option value="07:00">07:00 AM</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              )}
              <h3>Cupo Máximo:</h3>
              <Form.Control
                type="number"
                id="cupoMaximo"
                value={formValues.cupoMaximo}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Registrar examen</button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegistroExamen;
