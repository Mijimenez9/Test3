CREATE DATABASE sistemas_lenguas_extranjeras;
use sistemas_lenguas_extranjeras;
-- drop database sistemas_lenguas_extranjeras;
-- CREATE TABLE Carrera (
 --  id_carrera INT PRIMARY KEY AUTO_INCREMENT,
  -- nombre_carrera VARCHAR(100) NOT NULL
-- );

CREATE TABLE Estudiante (
  folioPago VARCHAR(255) PRIMARY KEY NOT NULL, 
  numero_control VARCHAR(20) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  apellido_paterno VARCHAR(255) NOT NULL,
  apellido_materno VARCHAR(255) NOT NULL,
  carrera VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  sexo VARCHAR(1) NOT NULL
);

CREATE TABLE Examen (
  id_examen INT PRIMARY KEY AUTO_INCREMENT,
  fecha_examen DATE NOT NULL,
  hora_examen TIME NOT NULL,
  duracion INT NOT NULL,
  cupo_maximo INT NOT NULL
);

CREATE TABLE Cita (
  id_cita INT PRIMARY KEY AUTO_INCREMENT,
  folioPago VARCHAR(255) NOT NULL, 
  id_examen INT NOT NULL,
  fechaExamen DATE NOT NULL,
  horaExamen TIME NOT NULL,
  
  estatus VARCHAR(10) NOT NULL,
  FOREIGN KEY (folioPago) REFERENCES Estudiante(folioPago),
  FOREIGN KEY (id_examen) REFERENCES Examen(id_examen)
);

CREATE TABLE Calificacion (
  id_calificacion INT PRIMARY KEY AUTO_INCREMENT,
  id_cita INT NOT NULL,
  calificacion INT NOT NULL,
  aprobado BOOLEAN NOT NULL,
  folioPago VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_cita) REFERENCES Cita(id_cita),
  FOREIGN KEY (folioPago) REFERENCES Estudiante(folioPago)
);

CREATE TABLE Administrador (
  id_administrador INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  apellido_paterno VARCHAR(255) NOT NULL,
  apellido_materno VARCHAR(255) NOT NULL,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL
);
