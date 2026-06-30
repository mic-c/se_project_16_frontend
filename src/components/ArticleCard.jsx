import React from "react";

export default function ArticleCard({ article }) {
  const { title, description, urlToImage, url, publishedAt, source } = article;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card"
    >
      {urlToImage && (
        <div className="article-image">
          <img src={urlToImage} alt={title} />
        </div>
      )}
      <div className="article-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="article-meta">
          <span className="source">{source?.name}</span>
          <span className="date">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </a>
  );
}
