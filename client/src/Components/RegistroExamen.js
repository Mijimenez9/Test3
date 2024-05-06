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
    let newValue = value;

    setFormValues((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado: ", formValues);

    // Implementar lógica de registro aquí (con Axios o método preferido)
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
                <h3>Fecha de Examen :</h3>

                <CalendarioAdmin
                  className="calendar"
                  selectedDate={formValues.fechaExamen}
                  onDateChange={(date) =>
                    setFormValues((prevState) => ({
                      ...prevState,
                      fechaExamen: date,
                    }))
                  }
                />
              </div>
              <h3>Cupo Maximo</h3>

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
