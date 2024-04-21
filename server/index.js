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

app.post("/create",(req,res)=>{
    const nombre= req.body.nombre;
    const apellidoMaterno= req.body.apellidoMaterno;
    const apellidoPaterno= req.body.apellidoPaterno;
    const numControl= req.body.numControl;
    const carrera= req.body.carrera;
    const genero= req.body.genero;
    const semestre= req.body.semestre;
    const correo= req.body.correo;
    const telefono= req.body.telefono;

    db.query('INSERT INTO estudiante(nombre,apellido_paterno,apellido_materno,numero_control,carrera,correo_electronico,telefono,sexo) VALUES(?,?.?,?,?,?,?,?,?)',[nombre,apellidoPaterno,apellidoMaterno,numControl,carrera,genero,semestre,correo,telefono],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Estudiante Registrado con exito");
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


app.listen(3307,()=>{
    console.log("Corriendo en el puerto 3307")




});