import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Detail from './components/Detail';

const App = () => {
  // Check if user is logged in (check for user in localStorage)
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Redirect to Dashboard if logged in, otherwise redirect to Register */}
        <Route 
          path="/" 
          element={user ? <Dashboard /> : <Navigate to="/register" replace />} 
        />
        
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
