const express = require("express");
const app= express();
const mysql= require("mysql");
const cors= require("cors");


app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host:"localhost",
   
    user:"root",
    password:"@Osc4r4rz4t3",
    database:"sistemas_lenguas_extranjeras"
   
});

app.post("/create", (req, res) => {
    const { folioPago,nombres, apellidoMaterno, apellidoPaterno, numControl, carrera, genero, email, telefono, fechaExamen, horaExamen } = req.body;
  
    db.query('INSERT INTO Estudiante(folioPago,nombre, apellido_paterno, apellido_materno, numero_control, carrera, correo_electronico, telefono, sexo) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)',
      [folioPago,nombres, apellidoPaterno, apellidoMaterno, numControl, carrera, email, telefono, genero],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al registrar estudiante");
        } else {
          res.status(200).send("Estudiante registrado correctamente");
        }
      }
    );
  });
  app.post("/createCita", (req, res) => {
    const { id_estudiante, id_examen, fechaExamen, horaExamen, folioPago } = req.body;
  
    db.query('INSERT INTO Cita(numero_control, id_examen, fechaExamen, horaExamen, folioPago, estatus) VALUES (?, ?, ?, ?, ?, ?)',
      [id_estudiante, id_examen, fechaExamen, horaExamen, folioPago, 'ACTIVO'], // Suponiendo que el estatus siempre es 'ACTIVO' al crear una cita
      (err, result) => {
        if (err) {
          console.error("Error al registrar cita:", err);
          res.status(500).send("Error al registrar cita");
        } else {
          res.status(200).send("Cita registrada correctamente");
        }
      }
    );
  });
app.get("/examDates", (req, res) => {
    db.query('SELECT fecha_examen FROM Examen', (err, result) => {
        if (err) {
            console.error("Error al obtener fechas de examen:", err);
            res.status(500).send("Error al obtener fechas de examen");
        } else {
            const examDates = result.map(row => row.fecha_examen); // Corregir aquí
            res.json(examDates);
        }
    });
});
app.get("/examTimes", (req, res) => {
    const selectedDate = req.query.date; // Obtener la fecha seleccionada del query string
    if (!selectedDate) {
        return res.status(400).send("La fecha no ha sido proporcionada");
    }

    db.query('SELECT hora_examen FROM Examen WHERE fecha_examen = ?', selectedDate, (err, result) => {
        if (err) {
            console.error("Error al obtener los horarios de examen para la fecha seleccionada:", err);
            return res.status(500).send("Error al obtener los horarios de examen para la fecha seleccionada");
        } else {
            const examTimes = result.map(row => row.hora_examen);
            return res.json(examTimes);
        }
    });
});
app.get("/getExamenId", (req, res) => {
    const fechaExamen = req.query.fecha;
    const horaExamen = req.query.hora;

    db.query('SELECT id_examen FROM Examen WHERE fecha_examen = ? AND hora_examen = ?',
      [fechaExamen, horaExamen],
      (err, result) => {
        if (err) {
          console.error("Error al obtener ID de examen:", err);
          res.status(500).send("Error al obtener ID de examen");
        } else {
          if (result.length > 0) {
            res.status(200).json(result[0]);
          } else {
            res.status(404).send("No se encontró ningún examen para la fecha y hora especificadas");
          }
        }
      }
    );
});
app.get("/buscarFolio", (req, res) => {
  const folioPago = req.query.folioPago;

  db.query(
    "SELECT * FROM Estudiante WHERE folioPago = ?",
    [folioPago],
    (err, result) => {
      if (err) {
        console.error("Error al buscar el folio:", err);
        res.status(500).send("Error al buscar el folio");
        
      } else {
        if (result.length > 0) {
          // Si se encuentra el folio, enviar los datos al cliente
          res.status(200).json(result[0]);
          console.log("FOLIO  ENCONTRADO" );

        } else {
          // Si el folio no se encuentra, responder con un error
          res.status(404).send("FOLIO NO ENCONTRADO");
          console.log("FOLIO NO ENCONTRADO"+folioPago+" //aa");
        }
      }
    }
  );
});
app.listen(3307,()=>{
    console.log("Corriendo en el puerto 3307")




});