import React, { useState } from "react";
import Axios from "axios";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import "./registro.css";
import { useNavigate } from "react-router-dom";
import MyCalendar from "./MyCalendar";

const initialState = {
  apellidoPaterno: "",
  apellidoMaterno: "",
  nombres: "",
  genero: "",
  folioPago: "",
  carrera: "",
  numControl: "",
  email: "",
  telefono: "",
  fechaExamen: null,
  horaExamen: null,
};

const Registro = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [emailError, setEmailError] = useState("");
  const [dateTimeSelected, setDateTimeSelected] = useState(false);
  const navigate = useNavigate(); // Obtener la función de navegación


  const add = () => {
    const formattedDate = formValues.fechaExamen.toISOString().split('T')[0];
  
    Axios.post("http://localhost:3307/create", {
      ...formValues,
      fechaExamen: formattedDate, // Envía la fecha formateada
    })
      .then((response) => {
        Axios.get(
          `http://localhost:3307/getExamenId?fecha=${formattedDate}&hora=${formValues.horaExamen}`
        )
          .then((response) => {
            const examenId = response.data.id_examen;

            Axios.post("http://localhost:3307/createCita", {
              numero_control: formValues.numControl,
              id_examen: examenId,
              fechaExamen: formattedDate, // Envía la fecha formateada
              horaExamen: formValues.horaExamen,
              folioPago: formValues.folioPago,
              estatus: "ACTIVO",
            })
              .then(() => {
                console.log("los valores son ",formValues); // Asegúrate de que formValues tenga los datos correctos antes de navegar

                alert("Estudiante registrado y cita agendada");
                setFormValues(initialState); // Reinicia el estado del formulario
                setDateTimeSelected(false); // Reinicia el estado de selección de fecha y hora
               
              })
              .catch((error) => {
                alert("Error al agendar cita: " + error);
              });
          })
          .catch((error) => {
            alert("Error al obtener ID de examen: " + error);
          });
      })
      .catch((error) => {
        alert("Error al registrar estudiante: " + error);
      });
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    switch (id) {
      case "apellidoPaterno":
      case "apellidoMaterno":
      case "nombres":
        newValue = value.toUpperCase().replace(/[^A-Z\sÑ]/g, "");
        break;
      case "numControl":
        newValue = value
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 9);
        break;
      case "semestre":
        newValue = value.replace(/\D/g, "").slice(0, 2);
        break;
      case "genero":
        newValue = value.toLowerCase().startsWith("m") ? "M" : "F";
        break;
      case "telefono":
        newValue = value.replace(/\D/g, "").slice(0, 10);
        break;
      default:
        break;
    }

    setFormValues((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const handleTimeChange = (time) => {
    setFormValues((prevState) => ({
      ...prevState,
      horaExamen: time,
    }));
    setDateTimeSelected(true);
  };

  const handleEmailBlur = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      setEmailError(
        "Por favor, introduzca una dirección de correo electrónico válida."
      );
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = {
      ...formValues,
      genero: formValues.genero.toLowerCase().startsWith("m") ? "M" : "F",
    };
    //navigate("/ExamConfirmation", { state: formValues });
  };

  const handleDateChange = (date) => {
    setFormValues((prevState) => ({
      ...prevState,
      fechaExamen: date,
    }));
    setDateTimeSelected(true);
  };
  return (
    <>
      <Container className="my-5">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Registro de examen</h2>
            <Form onSubmit={handleSubmit}>
              <h5>Fecha de examen</h5>
              <Row style={{ marginTop: '0 auto' ,width:'800px',height:'500px'}}>
                <Col md={6}>
                  <Form.Group controlId="fechaExamen">
                    <Form.Label>Fecha de Examen:</Form.Label>
                    <MyCalendar
                      selectedDate={formValues.fechaExamen}
                      onDateChange={handleDateChange}
                      onTimeChange={handleTimeChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h5>Información personal</h5>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="apellidoPaterno">
                    <Form.Label>Apellido Paterno:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apellido Paterno"
                      value={formValues.apellidoPaterno}
                      onChange={handleInputChange}
                      disabled={!dateTimeSelected}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="apellidoMaterno">
                    <Form.Label>Apellido Materno:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apellido Materno"
                      value={formValues.apellidoMaterno}
                      onChange={handleInputChange}
                      disabled={!dateTimeSelected}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="nombres">
                    <Form.Label>Nombres:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombres"
                      value={formValues.nombres}
                      onChange={handleInputChange}
                      disabled={!dateTimeSelected}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="genero">
                    <Form.Label>Género:</Form.Label>
                    <Form.Control
                      as="select"
                      value={formValues.genero}
                      onChange={handleInputChange}
                      disabled={!dateTimeSelected}
                    >
                      <option value="">Selecciona</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="folioPago">
                    <Form.Label>Folio de Pago:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Folio de Pago"
                      value={formValues.folioPago}
                      onChange={handleInputChange}
                      disabled={!dateTimeSelected}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h5>Información académica</h5>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="carrera">
                    <Form.Label>Carrera:</Form.Label>
                    <Form.Control
                      as="select"
                      value={formValues.carrera}
                      onChange={handleInputChange}
                      disabled={!dateTimeSelected}
                    >
                      <option value="">Selecciona</option>
                      <option value="Arquitectura">Arquitectura</option>
                      <option value="Lic. en Administración">
                        Lic. en Administración
                      </option>
                      <option value="Contador Público">Contador Público</option>
                      <option value="Ing. Ambiental">Ing. Ambiental</option>
                      <option value="Ing. Biomédica">Ing. Biomédica</option>
                      <option value="Ing. Civil">Ing. Civil</option>
                      <option value="Ing. en Diseño Industrial">
                        Ing. en Diseño Industrial
                      </option>
                      <option value="Ing. Electrónica">Ing. Electrónica</option>
                      <option value="Ing. en Gestión Empresarial">
                        Ing. en Gestión Empresarial
                      </option>
                      <option value="Ing. en Logística">
                        Ing. en Logística
                      </option>
                      <option value="Ing. en Nanotecnología">
                        Ing. en Nanotecnología
                      </option>
                      <option value="Ing. Química">Ing. Química</option>
                      <option value="Ing. Aeronáutica">Ing. Aeronáutica</option>
                      <option value="Ing. Bioquímica">Ing. Bioquímica</option>
                      <option value="Ing. Electromecánica">
                        Ing. Electromecánica
                      </option>
                      <option value="Ing. Informática">Ing. Informática</option>
                      <option value="Ing. en Sistemas Computacionales">
                        Ing. en Sistemas Computacionales
                      </option>
                      <option value="Ing. en Tecnologías de la Información y Comunicaciones">
                        Ing. en Tecnologías de la Información y Comunicaciones
                      </option>
                      <option value="Ing. Industrial">Ing. Industrial</option>
                      <option value="Ing. Mecánica">Ing. Mecánica</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="numControl">
                    <Form.Label>Número de Control:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Número de Control"
                      value={formValues.numControl}
                      onChange={handleInputChange}
                      disabled={!dateTimeSelected}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h5>Información de contacto</h5>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Correo Electrónico:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formValues.email}
                      onBlur={handleEmailBlur}
                      onChange={handleInputChange}
                      isInvalid={!!emailError}
                      disabled={!dateTimeSelected}
                    />
                    <Form.Control.Feedback type="invalid">
                      {emailError}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="telefono">
                    <Form.Label>Número Telefónico:</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Número Telefónico"
                      value={formValues.telefono}
                      onChange={handleInputChange}
                      disabled={!dateTimeSelected}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center mt-4">
                <Button variant="primary" type="submit" onClick={add} disabled={!dateTimeSelected}>
                  Enviar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Registro;