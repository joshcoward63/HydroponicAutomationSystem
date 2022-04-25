import React from 'react';
import './App.css';
import Navbar from './components/Navbar1';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Records from './pages/Records';
import Program from './pages/program';
import DeviceManager from './pages/deviceManager';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/program' element={<Program/>} />
        <Route path='/Records' element={<Records/>} />
        {/* <Route path='/device-manager' element={<DeviceManager/>} /> */}
        <Route path='/about' element={<About/>} />
      </Routes>
    </Router>
  );
}

export default App;