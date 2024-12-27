import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import logo from '../assets/light.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user')); // Get user from sessionStorage

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBrandClick = () => {
    if (user) {
      navigate('/'); // Navigate to the dashboard if logged in
    } else {
      navigate('/register'); // Navigate to the register page if not logged in
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Remove only the session-specific login data
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <span className="navbar-brand d-flex align-items-center justify-content-center" onClick={handleBrandClick} style={{ cursor: 'pointer' }}>    
          <img
                  src={logo}
                  alt="Logo"
                  className="img-fluid"
                  style={{ maxHeight: '50px', marginRight: '10px' }}
                />
          <h1 className='mt-3'>DailyScope</h1>
        </span>
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
                <i className="fas fa-user-circle" style={{ fontSize: '2rem' }}></i>
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
