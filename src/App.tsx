import React from 'react';
import './App.css';
import {Login} from './Routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/login' element = {<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
