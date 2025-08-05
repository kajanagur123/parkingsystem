import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ParkingHome } from './components/ParkingHome';
import { ParkingForm } from './components/ParkingForm';
import { ExitForm } from './components/ExitForm';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ParkingHome />} />
            <Route path="/park" element={<ParkingForm />} />
            <Route path="/exit" element={<ExitForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;