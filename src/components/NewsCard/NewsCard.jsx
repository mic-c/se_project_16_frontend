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
  isSavedPage = false,
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
  const articleUrl = article.url || article.link || "";
  const isDeleteAction = isSavedPage;

  const openArticle = () => {
    if (articleUrl) {
      window.open(articleUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openArticle();
    }
  };

  return (
    <article
      className={`news-card${articleUrl ? " news-card_clickable" : ""}`}
      onClick={openArticle}
      onKeyDown={handleCardKeyDown}
      role={articleUrl ? "link" : undefined}
      tabIndex={articleUrl ? 0 : undefined}
    >
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
              isDeleteAction ? " news-card__bookmark_type_delete" : ""
            }${
              !isLoggedIn
                ? " news-card__bookmark_inactive"
                : isSaved
                  ? " news-card__bookmark_active"
                  : ""
            }`}
            onClick={(event) => {
              event.stopPropagation();
              handleSaveClick();
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={isSaved ? "Remove from saved" : "Save article"}
          >
            {isDeleteAction ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="news-card__bookmark-icon"
                  d="M9 4H15L16 6H20V8H4V6H8L9 4ZM6 9H18L17 20H7L6 9ZM10 11V18H12V11H10ZM12 11V18H14V11H12Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </div>
      <div className="news-card__content">
        <p className="news-card__date">{formattedDate || "\u00A0"}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{sourceName}</p>
      </div>
    </article>
  );
}
