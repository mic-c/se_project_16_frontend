import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

export default function Header({
  isLoggedIn,
  currentUserName,
  onLoginClick,
  onLogoutClick,
}) {
  const location = useLocation();
  const isDarkTheme = location.pathname === "/saved-news";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("page_locked", isMenuOpen);

    return () => {
      document.body.classList.remove("page_locked");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`header${isDarkTheme ? " header_theme_dark" : ""}${
        isMenuOpen ? " header_menu-open" : ""
      }`}
    >
      <div className="header__container">
        <Link
          to="/"
          className={`header__logo${isDarkTheme ? " header__logo_theme_dark" : ""}`}
          aria-label="News Explorer home"
          onClick={closeMenu}
        >
          NewsExplorer
        </Link>
        <button
          type="button"
          className={`header__menu-button${
            isDarkTheme ? " header__menu-button_theme_dark" : ""
          }${isMenuOpen ? " header__menu-button_open" : ""}`}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              className="header__menu-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              className="header__menu-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 8H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 16H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUserName={currentUserName}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
          isDarkTheme={isDarkTheme}
          isMenuOpen={isMenuOpen}
          onCloseMenu={closeMenu}
        />
      </div>
      {isMenuOpen && (
        <div
          className="header__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
