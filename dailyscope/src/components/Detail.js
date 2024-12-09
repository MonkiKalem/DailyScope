import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Detail = () => {
  const { id } = useParams(); // Get the article index from URL
  const location = useLocation(); // Get the current URL location
  const navigate = useNavigate(); // Hook for navigation
  const currentPage = new URLSearchParams(location.search).get('page') || 1; // Get page number from query parameters

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem(`articles_page_${currentPage}`)); // Get articles from localStorage for the current page
    if (articles && articles.length > 0) {
      setArticle(articles[id]); // Get the article by index
    }
  }, [currentPage, id]);

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h2 className="text-danger">Article Not Found</h2>
          <p className="text-muted">The article you are looking for does not exist or has been removed.</p>
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 card-detail-container">
        <div className="mb-3">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            &larr; Back
          </button>
        </div>
        <div className="card card-detail shadow-lg border-0">
          <div className="row">
            <div className="col-md-6 p-4">
              <img
                src={article.urlToImage || 'https://via.placeholder.com/600'}
                className="img-fluid"
                alt={article.title}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="card-body">
                <h2 className="card-title text-primary">{article.title}</h2>
                <p className="card-text text-secondary">
                  {article.description || 'No description available for this article.'}
                </p>
                <p className="card-text">
                  <small className="text-muted">Published: {article.publishedAt || 'Unknown date'}</small>
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-3"
                >
                  Read Full Article
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Detail;
