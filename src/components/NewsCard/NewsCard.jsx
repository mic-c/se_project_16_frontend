import React, { useState } from "react";
import "./NewsCard.css";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function NewsCard({
  article,
  isSaved,
  isLoggedIn,
  onSaveClick,
}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleSaveClick = () => {
    if (!isLoggedIn) return;
    if (onSaveClick) {
      onSaveClick(article);
    }
  };

  const handleMouseEnter = () => {
    if (!isLoggedIn) setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const imageUrl = article.urlToImage || article.image;
  const sourceName = article.source?.name || article.source || "";
  const formattedDate = formatDate(article.publishedAt);

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        {imageUrl ? (
          <img
            className="news-card__image"
            src={imageUrl}
            alt={article.title}
          />
        ) : (
          <div className="news-card__image-placeholder" />
        )}
        <div className="news-card__bookmark-wrapper">
          {isTooltipVisible && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          <button
            className={`news-card__bookmark${
              !isLoggedIn
                ? " news-card__bookmark_inactive"
                : isSaved
                  ? " news-card__bookmark_active"
                  : ""
            }`}
            onClick={handleSaveClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={isSaved ? "Remove from saved" : "Save article"}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="news-card__bookmark-icon"
                d="M7 6C7 5.44772 7.44772 5 8 5H18C18.5523 5 19 5.44772 19 6V21L13 17.5L7 21V6Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="news-card__content">
        {formattedDate && <p className="news-card__date">{formattedDate}</p>}
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{sourceName}</p>
      </div>
    </article>
  );
}
