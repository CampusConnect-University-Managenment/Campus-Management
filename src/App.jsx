import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Exam from './pages/Exam';
import Faculty from './pages/Faculty';
import Student from './pages/Student';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-4 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/exam" element={<Exam />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/student" element={<Student />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;