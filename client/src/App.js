import React from 'react'
import NavBar  from './Components/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Inicio from './Components/inicio'; 
import Registro from './Components/registro'; 
import './App.css';
import LoginScreen from './Components/LoginScreen';
import ExamConfirmation from './Components/ExamConfirmation';

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>  
        <Route path='/' element={<Inicio></Inicio> }></Route>
        <Route path='/Registro' element={<Registro></Registro> }></Route>
        <Route path='/*' element={<Navigate to='/' />}></Route>
        <Route path='/LoginScreen' element={<LoginScreen></LoginScreen> }></Route>
        <Route path='/Confirmacion' element={<ExamConfirmation></ExamConfirmation> }></Route>
      </Routes>

    </div>
 
  );
}

export default App;
