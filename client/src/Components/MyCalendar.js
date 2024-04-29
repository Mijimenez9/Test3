import React, { useState, useEffect } from "react";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarStyles.css";

const MyCalendar = ({ onDateChange, selectedDate, selectedTime, onTimeChange }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    // Obtener fechas disponibles al cargar el componente
    Axios.get("http://localhost:3307/examDates")
      .then((response) => {
        setAvailableDates(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las fechas disponibles:", error);
      });
  }, []);

  useEffect(() => {
    // Obtener horas disponibles cuando se selecciona una fecha
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      Axios.get(`http://localhost:3307/examTimes?date=${formattedDate}`)
        .then((response) => {
          setAvailableTimes(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los horarios disponibles:", error);
        });
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    if (onTimeChange) {
      onTimeChange(selectedTime);
    }
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
