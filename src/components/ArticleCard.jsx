import React from "react";

export default function ArticleCard({ article }) {
  const { title, description, urlToImage, url, publishedAt, source } = article;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card article-card__link"
    >
      {urlToImage && (
        <div className="article-card__image-wrapper">
          <img className="article-card__image" src={urlToImage} alt={title} />
        </div>
      )}
      <div className="article-card__content">
        <h3 className="article-card__title">{title}</h3>
        <p className="article-card__description">{description}</p>
        <div className="article-card__meta">
          <span className="article-card__source">{source?.name}</span>
          <span className="article-card__date">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </a>
  );
}
