import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarioAdminStyles.css'

const CalendarioAdmin = ({ selectedDate, onDateChange }) => {
  // Obtener la fecha actual
  const today = new Date();

  // Obtener la hora actual
  const currentHour = today.getHours();

  // Definir las horas mínimas y máximas permitidas
  const minTime = new Date();
  minTime.setHours(7, 0, 0); // 7:00 AM

  const maxTime = new Date();
  maxTime.setHours(17, 0, 0); // 5:00 PM

  // Filtrar las horas disponibles
  const filterTime = time => {
    if (selectedDate) {
      // Si es hoy y la hora es anterior a la hora actual, no mostrar
      if (selectedDate.getDate() === today.getDate() && time < currentHour) {
        return false;
      }
    }
    return true;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
     
    <DatePicker
      selected={selectedDate}
      onChange={date => onDateChange(date)}
      dateFormat="dd/MM/yyyy"
      calendarClassName="calendar"
      className="calendar"
      open={true}
      readOnly
      minDate={today} // Solo se pueden seleccionar días posteriores a hoy
      minTime={minTime}
      maxTime={maxTime}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={60}
      timeCaption="Hora"
      filterTime={filterTime}
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
  );
};

export default CalendarioAdmin;
