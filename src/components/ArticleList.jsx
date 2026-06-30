import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles, isLoading }) {
  if (isLoading) {
    return <div className="loading">Loading articles...</div>;
  }

  if (articles.length === 0) {
    return (
      <div className="empty-state">
        No articles found. Try searching for something!
      </div>
    );
  }

  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <ArticleCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
}
