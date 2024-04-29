import React, { useState, useEffect } from "react";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarStyles.css";

const MyCalendar = ({ onDateChange, selectedDate }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    // Aquí realizas la solicitud para obtener las fechas disponibles de la base de datos
    Axios.get("http://localhost:3307/examDates")
      .then((response) => {
        setAvailableDates(response.data); // Suponiendo que response.data es un array de fechas disponibles
      })
      .catch((error) => {
        console.error("Error al obtener las fechas disponibles:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // Aquí realizas la solicitud para obtener los horarios de examen para la fecha seleccionada
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Formatear la fecha como YYYY-MM-DD
      Axios.get(`http://localhost:3307/examTimes?date=${formattedDate}`)
        .then((response) => {
          setAvailableTimes(response.data); // Suponiendo que response.data es un array de horarios disponibles
        })
        .catch((error) => {
          console.error("Error al obtener los horarios disponibles:", error);
        });
    } else {
      setAvailableTimes([]); // Si no hay fecha seleccionada, borra los horarios
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    if (onDateChange) {
      onDateChange(date); // Llamar a la función proporcionada para manejar el cambio de fecha
    }
  };

  const handleTimeChange = (e) => {
    // Tu lógica para manejar el cambio de hora
    console.log("Hora seleccionada:", e.target.value);
  };

  return (
    <div style={{ display: "block" }}>
      <h2>Calendario</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd-MM-yyyy"
        isClearable
        filterDate={(date) =>
          availableDates.some(
            (availableDate) =>
              new Date(availableDate).toDateString() === date.toDateString()
          )
        }
      />

      {selectedDate && (
        <select onChange={handleTimeChange}>
          <option value="">Selecciona una hora</option>
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default MyCalendar;
