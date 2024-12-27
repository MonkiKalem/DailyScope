import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/dark.png';

const Register = () => {
  const [user, setUser] = useState({ name: '', username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []; // Array of registered users
    const userExists = storedUsers.find((u) => u.username === user.username);

    // Validation for username, password, and confirm password
    if (user.name.length < 0) {
      setError('Name cannot be empty!');
      return;
    }
    if (user.username.length < 0) {
      setError('username cannot be empty!');
      return;
    }
    if (user.password.length < 0) {
      setError('password cannot be empty!');
      return;
    }
    if (user.username.length < 3) {
      setError('Username must be at least 3 characters long!');
      return;
    }

    if (user.password.length < 8) {
      setError('Password must be at least 8 characters long!');
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (userExists) {
      setError('Username already exists!');
    } else {
      const updatedUsers = [...storedUsers, { name: user.name, username: user.username, password: user.password }];
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save updated users list
      alert('Registration successful!');
      navigate('/login');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="img-fluid"
                  style={{ maxHeight: '80px', marginRight: '10px' }}
                />
                <h2 className="mb-0 mt-4">DailyScope</h2>
          </div>
          <h2 className="text-center mb-4 mt-5">Register</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter your password"
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                required
              />
            </div>
            {error && <div className="text-danger">{error}</div>}
            <button type="button" className="btn btn-primary w-100" onClick={handleRegister}>
              Register
            </button>
          </form>
          <p className="text-center mt-2">Already have an account? <a href="/login">login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
