import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []; // Get registered users
    const user = storedUsers.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user)); // Save to sessionStorage
      setUser(user); // Update the user state in App.js
      alert('Login successful!');
      navigate('/'); // Redirect to dashboard
    } else {
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
            {error && <div className="text-danger">{error}</div>}
            <button type="button" className="btn btn-primary w-100" onClick={handleLogin}>
              Login
            </button>
          </form>
          <p class="text-center mt-2">Dont have an account? <a href='/register'>register here</a> </p>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
