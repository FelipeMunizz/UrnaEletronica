import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import CandidateRegisterPage from './Pages/CandidateRegisterPage/CandidateRegisterPage';
import UrnPage from './Pages/UrnPage/UrnPage';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<UrnPage />} />
        <Route path="/register" element={<CandidateRegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
