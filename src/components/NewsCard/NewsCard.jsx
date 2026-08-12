import React, { useState } from "react";
import bookmarkOutlineIcon from "../../assets/icons/bookmark-outline.svg";
import bookmarkActiveIcon from "../../assets/icons/bookmark-active.svg";
import deleteBookmarkIcon from "../../assets/icons/delete-bookmark.svg";
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
  keyword,
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
  const articleKeyword = keyword || article.keyword || '';

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
        {isSavedPage && articleKeyword && (
          <span className="news-card__keyword">{articleKeyword}</span>
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
              <img
                className="news-card__bookmark-icon"
                src={deleteBookmarkIcon}
                alt=""
                aria-hidden="true"
              />
            ) : isSaved ? (
              <img
                className="news-card__bookmark-icon"
                src={bookmarkActiveIcon}
                alt=""
                aria-hidden="true"
              />
            ) : (
              <img
                className="news-card__bookmark-icon"
                src={bookmarkOutlineIcon}
                alt=""
                aria-hidden="true"
              />
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
