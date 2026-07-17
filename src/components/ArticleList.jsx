import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles, isLoading }) {
  if (isLoading) {
    return (
      <div className="article-list article-list_loading">
        Loading articles...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="article-list article-list_empty">
        No articles found. Try searching for something!
      </div>
    );
  }

  return (
    <div className="article-list article-list_grid">
      {articles.map((article, index) => (
        <ArticleCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
}
