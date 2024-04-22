INSERT INTO Estudiante(nombre,apellido_paterno,apellido_materno,numero_control,id_carrera,correo_electronico,telefono,sexo) 
VALUES('Aldo','Cruz','Sosa','20211212',7,'aldocruz@tectijuana.edu.mx','6642252525','M');

select * from estudiante
select * from Cita

ALTER TABLE Cita
CHANGE COLUMN fecha_cita fechaExamen DATE NOT NULL,
CHANGE COLUMN hora_cita horaExamen TIME NOT NULL,
CHANGE COLUMN recibo foliopago VARCHAR(255) NOT NULL;

ALTER TABLE Cita
CHANGE COLUMN folio_pago foliopago VARCHAR(255) NOT NULL;
