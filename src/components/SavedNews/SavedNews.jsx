import React from "react";
import Header from "../Header/Header";
import NewsCard from "../NewsCard/NewsCard";
import Footer from "../Footer/Footer";
import "./SavedNews.css";

export default function SavedNews({
  savedArticles,
  onRemoveArticle,
  isLoggedIn,
  currentUserName,
  onLoginClick,
  onLogoutClick,
}) {
  const keywords = [
    ...new Set(
      savedArticles
        .map((article) => article.keyword)
        .filter((keyword) => typeof keyword === 'string' && keyword.trim()),
    ),
  ]

  const keywordsSummary = (() => {
    if (!keywords.length) {
      return ''
    }

    if (keywords.length === 1) {
      return keywords[0]
    }

    if (keywords.length === 2) {
      return `${keywords[0]} and ${keywords[1]}`
    }

    return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} other`
  })()

  return (
    <div className="saved-news">
      <Header
        isLoggedIn={isLoggedIn}
        currentUserName={currentUserName}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
      />
      <div className="saved-news__banner">
        <p className="saved-news__label">Saved articles</p>
        <h2 className="saved-news__title">
          {isLoggedIn
            ? `${currentUserName || "User"}, you have ${savedArticles.length} saved article${savedArticles.length !== 1 ? "s" : ""}`
            : "Sign in to view saved articles"}
        </h2>
        {isLoggedIn && keywordsSummary && (
          <p className="saved-news__keywords">
            By keywords: <span className="saved-news__keywords-strong">{keywordsSummary}</span>
          </p>
        )}
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
                  isSavedPage={true}
                  keyword={article.keyword}
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
      <Footer />
    </div>
  );
}
