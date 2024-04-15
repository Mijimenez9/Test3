const express = require("express");
const app= express();
const mysql= require("mysql");
const cors= require("cors");


app.use(cors());

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

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")




});