import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarioAdminStyles.css';
import { format } from 'date-fns';

const CalendarioAdmin = ({ onDateChange, selectedDate }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [minSelectableDate, setMinSelectableDate] = useState(new Date()); // Fecha mínima seleccionable (por defecto, es el día actual)

  useEffect(() => {
    generateAvailableTimes();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    if (onDateChange) {
      const formattedDate = format(date, 'yyyy-MM-dd'); // Formatear la fecha
      onDateChange(formattedDate); // Llamar a la función proporcionada para manejar el cambio de fecha con la fecha formateada
    }
  };

  const generateAvailableTimes = () => {
    if (selectedDate) {
      const times = [];
      const minHour = 7; // 7:00 AM
      const maxHour = 17; // 5:00 PM

      for (let hour = minHour; hour <= maxHour; hour++) {
        times.push(`${hour.toString().padStart(2, '0')}:00`);
      }

      setAvailableTimes(times);
    }
  };

  return (
    <div style={{ display: "block", margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <h2>Calendario</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy"
          calendarClassName="calendar"
          className="calendar"
          open={true}
          readOnly
          minDate={minSelectableDate} // Solo se pueden seleccionar fechas posteriores o iguales a hoy
        />
        <style>
          {`
            .react-datepicker-wrapper input {
              display: none;
            }
            .react-datepicker {
              width: 200%;
              display: flex;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default CalendarioAdmin;
