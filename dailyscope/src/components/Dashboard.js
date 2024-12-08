import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Make sure to import the CSS file where truncation styles are defined

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews(currentPage, 10, searchQuery, category).then((data) => {
      setArticles(data.articles);
      setTotalResults(data.totalResults);

      // Simpan artikel berdasarkan halaman
      localStorage.setItem(`articles_page_${currentPage}`, JSON.stringify(data.articles));
    });
  }, [currentPage, searchQuery, category]);

  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Update URL dengan halaman baru
    navigate(`/dashboard?page=${pageNumber}`);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset halaman saat melakukan pencarian
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setCurrentPage(1); // Reset halaman saat mengganti kategori
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Welcome, {user.name}</h2>

        {/* Pencarian */}
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

        {/* Kategori */}
        <select className="form-control mb-3" onChange={handleCategoryChange} value={category}>
          <option value="">Select Category</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="entertainment">Entertainment</option>
        </select>

        {/* Menampilkan Artikel */}
        <div className="row">
          {articles.map((article, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <div className="card mb-3">
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
              className={`btn btn-secondary ${currentPage === index + 1 ? 'active' : ''}`}
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
