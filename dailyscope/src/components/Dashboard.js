import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [topHeadlines, setTopHeadlines] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews(currentPage, 10, searchQuery, category).then((data) => {
      setArticles(data.articles);
      setTotalResults(data.totalResults);

      // Save articles by page in localStorage
      localStorage.setItem(`articles_page_${currentPage}`, JSON.stringify(data.articles));

      // Fetch top 4 headlines for the hero section
      if (currentPage === 1 && !searchQuery && !category) {
        setTopHeadlines(data.articles.slice(0, 4));
      }
    });
  }, [currentPage, searchQuery, category]);

  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/?page=${pageNumber}`);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {/* Hero Section */}
        <div id="topHeadlinesCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
          <div className="carousel-inner">
            {topHeadlines.map((article, index) => (
              <div
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                key={index}
              >
                <img
                  src={article.urlToImage || 'https://via.placeholder.com/800x400'}
                  className="d-block w-100"
                  alt={article.title}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                  <h5>{article.title}</h5>
                  <p>{article.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/detail/${index}?page=1`)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#topHeadlinesCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#topHeadlinesCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <h2>Welcome, {user.name}</h2>

        {/* Search */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search for news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary mb-3" onClick={handleSearch}>
          Search
        </button>

        {/* Category */}
        <select
          className="form-control mb-3"
          onChange={handleCategoryChange}
          value={category}
        >
          <option value="">Select Category</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="entertainment">Entertainment</option>
        </select>

        {/* Display Articles */}
        <div className="row">
          {articles.map((article, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <div className="card card-dashboard mb-3">
                <img
                  src={article.urlToImage || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={article.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => navigate(`/detail/${index}?page=${currentPage}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination mt-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
