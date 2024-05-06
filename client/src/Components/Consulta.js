import React, { useState } from "react";
import Axios from "axios";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import "./registro.css";

const Consulta = () => {
    const [formValues, setFormValues] = useState({
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
      genero: "",
      folioPago: "",
      carrera: "",
      numControl: "",
      semestre: "",
      email: "",
      telefono: "",
    });
  
    const [isConsultaDisabled, setIsConsultaDisabled] = useState(false); // Cambiado a false
    const [isModificarEnabled, setIsModificarEnabled] = useState(true); // Cambiado a true
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormValues((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validar si el campo de folio está vacío
      if (!formValues.folioPago) {
        alert("Por favor, ingrese un folio antes de enviar el formulario.");
        return;
      }
  
      try {
        const response = await Axios.get(`http://localhost:3307/buscarFolio?folioPago=${formValues.folioPago}`);
        
        if (response.data) {
          setFormValues(prevState => ({
            ...prevState, 
            apellidoPaterno: response.data.apellido_paterno,
            apellidoMaterno: response.data.apellido_materno,
            nombres: response.data.nombre,
            carrera: response.data.carrera,
            email: response.data.correo_electronico,
            telefono: response.data.telefono,
            genero: response.data.sexo,
            numControl: response.data.numero_control,
          }));
          setIsConsultaDisabled(true);
          setIsModificarEnabled(true);
        } else {
          alert("FOLIO NO ENCONTRADO");
        }
      } catch (error) {
        console.error("Error al buscar el folio:", error);
      }
    };
  
    const handleModify = () => {
      setIsConsultaDisabled(false);
      setIsModificarEnabled(false);
    };
  
    const handleCancel = () => {
      setFormValues({
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: "",
        genero: "",
        folioPago: "",
        carrera: "",
        numControl: "",
        semestre: "",
        email: "",
        telefono: "",
      });
      setIsConsultaDisabled(true);
      setIsModificarEnabled(false);
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
                    disabled={isConsultaDisabled}
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
                    disabled={isConsultaDisabled}
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
                    disabled={isConsultaDisabled}
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
                    disabled={isConsultaDisabled}
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
                    disabled={isConsultaDisabled}
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
                    disabled={isConsultaDisabled}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="semestre">
                  <Form.Label>Semestre:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Semestre"
                    value={formValues.semestre}
                    onChange={handleInputChange}
                    disabled={isConsultaDisabled}
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
                    disabled={isConsultaDisabled}
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
                    disabled={isConsultaDisabled}
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
                  Limpiar
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
