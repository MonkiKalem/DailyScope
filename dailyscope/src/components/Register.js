import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: '', username: '', password: '' });
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleRegister = () => {
    // Simpan data pengguna ke localStorage
    localStorage.setItem('user', JSON.stringify(user));
    // Arahkan ke halaman login
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
