import React, { useState } from "react";
import Axios from "axios";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import "./registro.css";

const Consulta = () => {
  const initialState = {
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    genero: "",
    folioPago: "",
    carrera: "",
    numControl: "",
    calificacion: "",
    email: "",
    telefono: "",
  };

  const [formValues, setFormValues] = useState(initialState);
 
  const [isConsultaDisabled, setIsConsultaDisabled] = useState(false);
  const [isModificarEnabled, setIsModificarEnabled] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.folioPago) {
      alert("Por favor, ingrese un folio antes de enviar el formulario.");
      return;
    }

    try {
      const response = await Axios.get(`http://localhost:3307/buscarFolio?folioPago=${formValues.folioPago}`);
      
      if (response.data) {
        setFormValues({
          ...initialState,
          apellidoPaterno: response.data.apellido_paterno,
          apellidoMaterno: response.data.apellido_materno,
          nombres: response.data.nombre,
          carrera: response.data.carrera,
          email: response.data.correo_electronico,
          telefono: response.data.telefono,
          genero: response.data.sexo,
          numControl: response.data.numero_control,
          calificacion: response.data.calificacion,
          folioPago:response.data.folioPago,
        });
        setIsConsultaDisabled(true);
        setIsModificarEnabled(true);
      } else {
        alert("FOLIO NO ENCONTRADO. Por favor, ingrese un folio correcto.");
      }
    } catch (error) {
      console.error("Error al buscar el folio:", error);
    }
  };



  const handleCancel = () => {
    setFormValues(initialState);
    
    setIsConsultaDisabled(false);
    setIsModificarEnabled(false);
  };

  
  const handleModify = async () => {
    try {
      setIsConsultaDisabled(false);
      setIsModificarEnabled(false);
      await Axios.post("http://localhost:3307/updateEstudiante", {
        
        nombres: formValues.nombres,
        apellidoMaterno: formValues.apellidoMaterno,
        apellidoPaterno: formValues.apellidoPaterno,
        numControl: formValues.numControl,
        carrera: formValues.carrera,
        genero: formValues.genero,
        email: formValues.email,
        telefono: formValues.telefono,
        calificacion: formValues.calificacion,
        folioPago:formValues.folioPago,
      });
      alert("Estudiante actualizado correctamente");
      setIsConsultaDisabled(false);
      setIsModificarEnabled(false);
    } catch (error) {
      console.error("Error al modificar estudiante:", error);
      alert("Error al modificar estudiante");
    }
  };

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Consulta Información del Alumno</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="folioPago">
                  <Form.Label>Folio de Pago:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Folio de Pago"
                    value={formValues.folioPago}
                    onChange={handleInputChange}
                    disabled={isConsultaDisabled}
                    
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="apellidoPaterno">
                  <Form.Label>Apellido Paterno:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellido Paterno"
                    value={formValues.apellidoPaterno}
                    onChange={handleInputChange}
                    disabled={!isModificarEnabled}
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
                    disabled={!isModificarEnabled}
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
                    disabled={!isModificarEnabled}
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
                    disabled={!isModificarEnabled}
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
                <Form.Group controlId="carrera">
                  <Form.Label>Carrera:</Form.Label>
                  <Form.Control
                    as="select"
                    value={formValues.carrera}
                    onChange={handleInputChange}
                    disabled={!isModificarEnabled}
                  >
                    <option value="">Selecciona</option>
                    <option value="Arquitectura">Arquitectura</option>
                    <option value="Lic. en Administración">Lic. en Administración</option>
                    {/* Resto de las opciones de carrera */}
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
                    disabled={!isModificarEnabled}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Correo Electrónico:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formValues.email}
                    onChange={handleInputChange}
                    disabled={!isModificarEnabled}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
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
                    disabled={!isModificarEnabled}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="calificacion">
                  <Form.Label>Calificación:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Calificación"
                    value={formValues.calificacion}
                    onChange={handleInputChange}
                    disabled={!isModificarEnabled}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center mt-4">
              <Button variant="primary" type="submit" disabled={isConsultaDisabled}>
                Consulta
              </Button>
            </div>
            <div className="text-center mt-4">
              <Button variant="success" onClick={handleModify} disabled={!isModificarEnabled}>
                Modificar
              </Button>
              {isModificarEnabled && (
                <Button variant="danger" onClick={handleCancel}>
                  Cancelar
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Consulta;
