CREATE DATABASE sistemas_lenguas_extranjeras;
use sistemas_lenguas_extranjeras;

CREATE TABLE Carrera (
  id_carrera INT PRIMARY KEY AUTO_INCREMENT,
  nombre_carrera VARCHAR(100) NOT NULL
);
CREATE TABLE Estudiante (
  id_estudiante INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  apellido_paterno VARCHAR(255) NOT NULL,
  apellido_materno VARCHAR(255) NOT NULL,
  numero_control VARCHAR(20) UNIQUE NOT NULL,
  id_carrera INT NOT NULL,
  correo_electronico VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  sexo VARCHAR(1) NOT NULL,
  FOREIGN KEY (id_carrera) REFERENCES Carrera(id_carrera)
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
  id_estudiante INT NOT NULL,
  id_examen INT NOT NULL,
  fecha_cita DATE NOT NULL,
  hora_cita TIME NOT NULL,
  recibo VARCHAR(255) NOT NULL,
  estatus VARCHAR(10) NOT NULL,
  FOREIGN KEY (id_estudiante) REFERENCES Estudiante(id_estudiante),
  FOREIGN KEY (id_examen) REFERENCES Examen(id_examen)
);

CREATE TABLE Calificacion (
  id_calificacion INT PRIMARY KEY AUTO_INCREMENT,
  id_cita INT NOT NULL,
  calificacion INT NOT NULL,
  aprobado BOOLEAN NOT NULL,
  FOREIGN KEY (id_cita) REFERENCES Cita(id_cita)
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
