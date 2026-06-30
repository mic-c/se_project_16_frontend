import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import About from "../About/About";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import { searchArticles } from "../../services/newsApi";
import {
  checkToken,
  deleteArticle,
  getSavedArticles,
  getStoredToken,
  login,
  logout,
  saveArticle,
} from "../../services/mockBackend";
import "./App.css";

export default function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const initializeSession = async () => {
      const token = getStoredToken();

      if (!token) {
        return;
      }

      try {
        await checkToken(token);
        const articles = await getSavedArticles();
        setSavedArticles(Array.isArray(articles) ? articles : []);
        setIsLoggedIn(true);
      } catch {
        setSavedArticles([]);
        setIsLoggedIn(false);
      }
    };

    initializeSession();
  }, []);

  const handleSearch = async (keyword) => {
    try {
      setIsLoading(true);
      setHasSearched(true);
      setSearchError(false);
      setCards([]);
      const results = await searchArticles(keyword);
      setCards(Array.isArray(results) ? results : []);
    } catch {
      setSearchError(true);
      setCards([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveArticle = async (article) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    try {
      const isAlreadySaved = savedArticles.some((a) => a.url === article.url);
      const nextArticles = isAlreadySaved
        ? await deleteArticle(article)
        : await saveArticle(article);

      setSavedArticles(Array.isArray(nextArticles) ? nextArticles : []);
    } catch {
      // no-op for now; UI state remains unchanged on failed simulation
    }
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSubmit = async (credentials) => {
    try {
      await login(credentials);
      const articles = await getSavedArticles();

      setSavedArticles(Array.isArray(articles) ? articles : []);
      setIsLoggedIn(true);
      closeLoginModal();
    } catch {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setSavedArticles([]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <Header
              isLoggedIn={isLoggedIn}
              onLoginClick={openLoginModal}
              onLogoutClick={handleLogout}
            />
            <main className="app-main">
              <section className="app-search-section">
                <h2 className="app-title">News Explorer</h2>
                <p className="app-subtitle">
                  Discover news from around the world
                </p>
                <SearchForm onSearch={handleSearch} isLoading={isLoading} />
              </section>
              <Main
                cards={cards}
                isLoading={isLoading}
                hasSearched={hasSearched}
                searchError={searchError}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
              />
            </main>
            <About />
            <Footer />
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={closeLoginModal}
              onSubmit={handleLoginSubmit}
              onSwitchToSignup={() => {}}
            />
          </div>
        }
      />
      <Route
        path="/saved-news"
        element={
          <SavedNews
            savedArticles={savedArticles}
            onRemoveArticle={handleSaveArticle}
            isLoggedIn={isLoggedIn}
            onLoginClick={openLoginModal}
            onLogoutClick={handleLogout}
          />
        }
      />
    </Routes>
  );
}
