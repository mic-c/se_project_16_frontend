import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./Main.css";

export default function Main({
  cards,
  isLoading,
  hasSearched,
  searchError,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
}) {
  if (!isLoading && !hasSearched) {
    return null;
  }

  return (
    <section className="main">
      <div className="main__container">
        <NewsCardList
          cards={cards}
          isLoading={isLoading}
          searchError={searchError}
          isLoggedIn={isLoggedIn}
          savedArticles={savedArticles}
          onSaveArticle={onSaveArticle}
        />
      </div>
    </section>
  );
}
