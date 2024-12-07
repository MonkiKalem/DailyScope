import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const articles = JSON.parse(localStorage.getItem('articles')); // Ambil artikel dari localStorage
  const article = articles ? articles[id] : null; // Cari artikel berdasarkan ID

  return (
    <div className="container mt-5">
      {article ? (
        <>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          {article.urlToImage && (
            <img src={article.urlToImage} alt="Article" className="img-fluid" />
          )}
        </>
      ) : (
        <p>Article not found.</p>
      )}
    </div>
  );
};

export default Detail;
