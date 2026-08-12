import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import "./NewsCardList.css";

const PAGE_SIZE = 3;

export default function NewsCardList({
  cards,
  isLoading,
  searchError,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset visible count when a new set of cards arrives
  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [cards]);

  if (isLoading) {
    return <Preloader />;
  }

  if (searchError) {
    return (
      <div className="news-card-list__status news-card-list__status_error">
        Sorry, something went wrong during the request. Please try again later.
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="news-card-list__status">
        <p className="news-card-list__nothing-found-title">Nothing Found</p>
        <p className="news-card-list__nothing-found-text">
          Sorry, but nothing matched your search terms.
        </p>
      </div>
    );
  }

  const visibleCards = cards.slice(0, visibleCount);
  const hasMore = visibleCount < cards.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="news-card-list__wrapper">
      <ul className="news-card-list">
        {visibleCards.map((card, index) => {
          const isSaved = savedArticles.some(
            (savedCard) => savedCard.url === card.url,
          );

          return (
            <li key={card.url || index} className="news-card-list__item">
              <NewsCard
                article={card}
                isSaved={isSaved}
                isLoggedIn={isLoggedIn}
                onSaveClick={onSaveArticle}
              />
            </li>
          );
        })}
      </ul>
      {hasMore && (
        <button className="news-card-list__show-more" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </div>
  );
}
