import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Detail from './components/Detail';

const App = () => {
  const [user, setUser] = useState(null);

  // Check sessionStorage when the app loads
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    setUser(loggedInUser);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        
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
