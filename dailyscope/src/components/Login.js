import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      setError('No registered user found.');
    } else if (
      storedUser.username === credentials.username &&
      storedUser.password === credentials.password
    ) {
      alert('Login successful!');
      navigate('/');
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
          <p>Dont have an account? </p>
          <a href='/register'>register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
