const express = require("express");
const app= express();
const mysql= require("mysql");
const cors= require("cors");
const mysql = require('mysql2');


app.use(cors());
app.use(express.json());
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
connection.connect(error => {
  if (error) {
    console.error('Error conectando a la base de datos:', error.stack);
    return;
  }
  console.log('Conectado a la base de datos como id', connection.threadId);
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
  
    db.query('INSERT INTO Cita(folioPago, id_examen, fechaExamen, horaExamen,  estatus) VALUES (?, ?, ?, ?, ?)',
      [folioPago, id_examen, fechaExamen, horaExamen,  'ACTIVO'], // Suponiendo que el estatus siempre es 'ACTIVO' al crear una cita
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

  db.query('SELECT hora_examen FROM Examen WHERE fecha_examen = ?', [selectedDate], (err, result) => {
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
app.post("/createExamen", (req, res) => {
  const { fechaExamen, horaExamen, cupoMaximo } = req.body;

  db.query('INSERT INTO Examen(fecha_examen, hora_examen, cupo_maximo) VALUES (?, ?, ?)',
    [fechaExamen, horaExamen, cupoMaximo],
    (err, result) => {
      if (err) {
        console.error("Error al crear examen:", err);
        res.status(500).send("Error al crear examen");
        console.log("Error al crear examen")
      } else {
        res.status(200).send("Examen creado correctamente");
        console.log(" EXAMEN CREADO");
      }
    }
  );
});

app.post("/updateEstudiante", (req, res) => {
  const {
    folioPago,
    nombres,
    apellidoMaterno,
    apellidoPaterno,
    numControl,
    carrera,
    genero,
    email,
    telefono,
    calificacion
  } = req.body;

  db.query(
    "UPDATE Estudiante SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, numero_control = ?, carrera = ?, correo_electronico = ?, telefono = ?, sexo = ?, calificacion = ? WHERE folioPago = ?",
    [nombres, apellidoPaterno, apellidoMaterno, numControl, carrera, email, telefono, genero, calificacion, folioPago],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar estudiante:", err);
        res.status(500).send("Error al actualizar estudiante");
      } else {
        res.status(200).send("Estudiante actualizado correctamente");
      }
    }
  );
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM Administrador WHERE email = ? AND password = ?', [email, password], (err, result) => {
      if (err) {
          console.error("Error al realizar la consulta:", err);
          res.status(500).send("Error interno del servidor");
      } else {
          if (result.length > 0) {
              // Si se encuentra el usuario, enviar una respuesta con éxito
              res.status(200).send("Inicio de sesión exitoso");
          } else {
              // Si el usuario o la contraseña son incorrectos, enviar una respuesta de error
              res.status(401).send("Usuario o contraseña incorrectos");
          }
      }
  });
});

app.listen(3307,()=>{
    console.log("Corriendo en el puerto 3307")




});