const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require('mysql2');

// Middleware
app.use(cors());
app.use(express.json());

// Configura la conexión a la base de datos
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

// Ruta para crear estudiante
app.post("/create", (req, res) => {
  const { folioPago, nombres, apellidoMaterno, apellidoPaterno, numControl, carrera, genero, email, telefono, fechaExamen, horaExamen } = req.body;

  connection.query(
    'INSERT INTO Estudiante (folioPago, nombre, apellido_paterno, apellido_materno, numero_control, carrera, correo_electronico, telefono, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [folioPago, nombres, apellidoPaterno, apellidoMaterno, numControl, carrera, email, telefono, genero],
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

// Ruta para crear cita
app.post("/createCita", (req, res) => {
  const { id_estudiante, id_examen, fechaExamen, horaExamen, folioPago } = req.body;

  connection.query(
    'INSERT INTO Cita (folioPago, id_examen, fechaExamen, horaExamen, estatus) VALUES (?, ?, ?, ?, ?)',
    [folioPago, id_examen, fechaExamen, horaExamen, 'ACTIVO'], // Suponiendo que el estatus siempre es 'ACTIVO' al crear una cita
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

// Obtener fechas de examen
app.get("/examDates", (req, res) => {
  connection.query('SELECT fecha_examen FROM Examen', (err, result) => {
    if (err) {
      console.error("Error al obtener fechas de examen:", err);
      res.status(500).send("Error al obtener fechas de examen");
    } else {
      const examDates = result.map(row => row.fecha_examen);
      res.json(examDates);
    }
  });
});

// Obtener horarios de examen
app.get("/examTimes", (req, res) => {
  const selectedDate = req.query.date; // Obtener la fecha seleccionada del query string
  if (!selectedDate) {
    return res.status(400).send("La fecha no ha sido proporcionada");
  }

  connection.query(
    'SELECT hora_examen FROM Examen WHERE fecha_examen = ?',
    [selectedDate],
    (err, result) => {
      if (err) {
        console.error("Error al obtener los horarios de examen para la fecha seleccionada:", err);
        return res.status(500).send("Error al obtener los horarios de examen para la fecha seleccionada");
      } else {
        const examTimes = result.map(row => row.hora_examen);
        return res.json(examTimes);
      }
    }
  );
});

// Obtener ID de examen
app.get("/getExamenId", (req, res) => {
  const fechaExamen = req.query.fecha;
  const horaExamen = req.query.hora;

  connection.query(
    'SELECT id_examen FROM Examen WHERE fecha_examen = ? AND hora_examen = ?',
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

// Buscar por folio
app.get("/buscarFolio", (req, res) => {
  const folioPago = req.query.folioPago;

  connection.query(
    "SELECT * FROM Estudiante WHERE folioPago = ?",
    [folioPago],
    (err, result) => {
      if (err) {
        console.error("Error al buscar el folio:", err);
        res.status(500).send("Error al buscar el folio");
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).send("FOLIO NO ENCONTRADO");
        }
      }
    }
  );
});

// Crear examen
app.post("/createExamen", (req, res) => {
  const { fechaExamen, horaExamen, cupoMaximo } = req.body;

  connection.query(
    'INSERT INTO Examen (fecha_examen, hora_examen, cupo_maximo) VALUES (?, ?, ?)',
    [fechaExamen, horaExamen, cupoMaximo],
    (err, result) => {
      if (err) {
        console.error("Error al crear examen:", err);
        res.status(500).send("Error al crear examen");
      } else {
        res.status(200).send("Examen creado correctamente");
      }
    }
  );
});

// Actualizar estudiante
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

  connection.query(
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

// Inicio de sesión
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM Administrador WHERE email = ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        res.status(500).send("Error interno del servidor");
      } else {
        if (result.length > 0) {
          res.status(200).send("Inicio de sesión exitoso");
        } else {
          res.status(401).send("Usuario o contraseña incorrectos");
        }
      }
    }
  );
});

// Iniciar el servidor
app.listen(3307, () => {
  console.log("Corriendo en el puerto 3307");
});