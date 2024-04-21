use sistemas_lenguas_extranjeras
SELECT id_examen,fecha_examen, hora_examen, duracion, cupo_maximo from Examen;
-- Insertar examen para el 22 de abril
INSERT INTO Examen (fecha_examen, hora_examen, duracion, cupo_maximo)
VALUES
('2024-04-22', '11:00:00', 60, 20),
('2024-04-22', '12:00:00', 60, 20),
('2024-04-22', '13:00:00', 60, 20);

-- Insertar examen para el 23 de abril
INSERT INTO Examen (fecha_examen, hora_examen, duracion, cupo_maximo)
VALUES
('2024-04-23', '11:00:00', 60, 20),
('2024-04-23', '12:00:00', 60, 20),
('2024-04-23', '13:00:00', 60, 20);

-- Insertar examen para el 24 de abril
INSERT INTO Examen (fecha_examen, hora_examen, duracion, cupo_maximo)
VALUES
('2024-04-24', '11:00:00', 60, 20),
('2024-04-24', '12:00:00', 60, 20),
('2024-04-24', '13:00:00', 60, 20);

-- Insertar examen para el 25 de abril
INSERT INTO Examen (fecha_examen, hora_examen, duracion, cupo_maximo)
VALUES
('2024-04-25', '11:00:00', 60, 20),
('2024-04-25', '12:00:00', 60, 20),
('2024-04-25', '13:00:00', 60, 20);