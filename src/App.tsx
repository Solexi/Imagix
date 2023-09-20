import React from 'react';
import './App.css';
import {Login, Home} from './Routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/home' element = {<Home />}/>
      <Route path = '/' element = {<Home />}/>
    </Routes>
    <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </BrowserRouter>
  );
}

export default App;
