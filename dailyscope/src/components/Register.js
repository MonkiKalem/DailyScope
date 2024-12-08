import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [user, setUser] = useState({ name: '', username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === user.username) {
      setError('Username already exists!');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      alert('Registration successful!');
      navigate('/login');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Register</h2>
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
            {error && <div className="text-danger">{error}</div>}
            <button type="button" className="btn btn-primary w-100" onClick={handleRegister}>
              Register
            </button>
          </form>
          <p>Already have an account? </p>
          <a href='/register'>login here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
