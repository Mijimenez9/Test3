import React, { useState, useEffect } from "react";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyCalendar = ({ onDateChange, selectedDate, onTimeChange }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const datesResponse = await Axios.get("http://localhost:3307/examDates");
        setAvailableDates(datesResponse.data);
        console.log("Datos de fechas disponibles:", datesResponse.data);
      } catch (error) {
        console.error("Error al obtener fechas disponibles:", error);
      }
    };

    fetchDates();
  }, []);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        console.log("Entra al useEffect");
        console.log("selectedDate es:", selectedDate);
        if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
          console.log("Entra al if");
          const formattedDate = selectedDate.toLocaleDateString('en-CA'); // Formatea la fecha con el formato deseado
          console.log("La fecha seleccionada desde useEffect formateada es " + formattedDate);
          const timesResponse = await Axios.get("http://localhost:3307/examTimes?date=" + formattedDate);
          setAvailableTimes(timesResponse.data);
          console.log("Datos de horarios disponibles:", timesResponse.data);
        } else {
          setAvailableTimes([]);
        }
      } catch (error) {
        console.error("Error al obtener horarios disponibles:", error);
      }
    };

    fetchTimes();
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
    <div>
      <h2>Calendario</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd" // Establece el formato de la fecha
        open={true}
        filterDate={(date) =>
          availableDates.some(
            (availableDate) =>
              new Date(availableDate).toDateString() === date.toDateString()
          )
        }
      />
  <style>
          {`
            .react-datepicker-wrapper input {
              display: none;
            }
            .react-datepicker {
              width: 300%;
              display: flex;
              right:60px;
            }
          `}
        </style>
      <div >
        <select onChange={handleTimeChange} style={{ marginTop:'350px', top:'-500px'}} >
          <option value="">Selecciona una hora</option>
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MyCalendar;
