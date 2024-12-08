import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Detail = () => {
  const { id } = useParams(); // Ambil indeks dari URL
  const location = useLocation(); // Mengambil lokasi (URL) saat ini
  const currentPage = new URLSearchParams(location.search).get('page') || 1; // Ambil halaman dari query parameter

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem(`articles_page_${currentPage}`)); // Ambil artikel dari localStorage sesuai halaman
    if (articles && articles.length > 0) {
      setArticle(articles[id]); // Ambil artikel berdasarkan indeks
    }
  }, [currentPage, id]);

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <h2>Article Not Found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card">
          <img
            src={article.urlToImage || 'https://via.placeholder.com/600'}
            className="card-img-top"
            alt={article.title}
            style={{ height: 'auto', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h3 className="card-title">{article.title}</h3>
            <p className="card-text">{article.description || 'No description available.'}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Read Full Article
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
