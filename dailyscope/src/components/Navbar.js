import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap bundle (includes Popper.js)
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome for the icon
import './styles.css'; // Import custom CSS if necessary

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    navigate('/login'); // Navigate to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/dashboard">
          <h1>DailyScope</h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* User icon dropdown */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-link dropdown-toggle"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user-circle" style={{ fontSize: '2rem' }}></i> {/* User Icon */}
              </button>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <span className="dropdown-item disabled">{user?.name}</span>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
