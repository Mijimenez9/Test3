use sistemas_lenguas_extranjeras
 SELECT fecha_examen from Examen;
-- DELETE * FROM Examen;
-- DELETE FROM Examen WHERE id_examen > 0;
-- DROP TABLE Examen;
-- Insertar examen para el 22 de abril
INSERT INTO Examen (fecha_examen, hora_examen, duracion, cupo_maximo)
VALUES
(STR_TO_DATE('22/04/2024', '%d/%m/%Y'), '11:00:00', 60, 20),
(STR_TO_DATE('22/04/2024', '%d/%m/%Y'), '12:00:00', 60, 20),
(STR_TO_DATE('22/04/2024', '%d/%m/%Y'), '13:00:00', 60, 20);

-- Insertar examen para el 23 de abril
INSERT INTO Examen (fecha_examen, hora_examen, duracion, cupo_maximo)
VALUES
(STR_TO_DATE('23/04/2024', '%d/%m/%Y'), '11:00:00', 60, 20),
(STR_TO_DATE('23/04/2024', '%d/%m/%Y'), '12:00:00', 60, 20),
(STR_TO_DATE('23/04/2024', '%d/%m/%Y'), '13:00:00', 60, 20);

-- Insertar examen para el 24 de abril
INSERT INTO Examen (fecha_examen, hora_examen, duracion, cupo_maximo)
VALUES
(STR_TO_DATE('24/04/2024', '%d/%m/%Y'), '11:00:00', 60, 20),
(STR_TO_DATE('24/04/2024', '%d/%m/%Y'), '12:00:00', 60, 20),
(STR_TO_DATE('24/04/2024', '%d/%m/%Y'), '13:00:00', 60, 20);

-- Insertar examen para el 25 de abril
INSERT INTO Examen (fecha_examen, hora_examen, duracion, cupo_maximo)
VALUES
(STR_TO_DATE('25/04/2024', '%d/%m/%Y'), '11:00:00', 60, 20),
(STR_TO_DATE('25/04/2024', '%d/%m/%Y'), '12:00:00', 60, 20),
(STR_TO_DATE('25/04/2024', '%d/%m/%Y'), '13:00:00', 60, 20);
