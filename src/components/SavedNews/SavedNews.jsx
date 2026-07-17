import React from "react";
import Header from "../Header/Header";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

export default function SavedNews({
  savedArticles,
  onRemoveArticle,
  isLoggedIn,
  onLoginClick,
  onLogoutClick,
}) {
  return (
    <div className="saved-news">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
      />
      <div className="saved-news__banner">
        <p className="saved-news__label">Saved articles</p>
        <h2 className="saved-news__title">
          {isLoggedIn
            ? `${savedArticles.length} article${savedArticles.length !== 1 ? "s" : ""} saved`
            : "Sign in to view saved articles"}
        </h2>
      </div>
      <main className="saved-news__main">
        {isLoggedIn && savedArticles.length > 0 ? (
          <ul className="saved-news__list">
            {savedArticles.map((article, index) => (
              <li key={article.url || index} className="saved-news__item">
                <NewsCard
                  article={article}
                  isSaved={true}
                  isLoggedIn={isLoggedIn}
                  onSaveClick={onRemoveArticle}
                />
              </li>
            ))}
          </ul>
        ) : (
          isLoggedIn && (
            <p className="saved-news__empty">
              You haven't saved any articles yet.
            </p>
          )
        )}
      </main>
    </div>
  );
}
