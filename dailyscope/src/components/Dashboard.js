import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate(); // Perbaikan navigasi

  useEffect(() => {
    fetchNews().then((data) => setArticles(data.articles));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Welcome, {user.name}</h2>
        <ul>
          {articles.map((article, index) => (
            <li key={index} onClick={() => navigate(`/detail/${index}`)}>
              {article.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
