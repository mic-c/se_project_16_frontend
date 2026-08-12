import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import menuIcon from "../../assets/icons/menu.svg";
import closeIcon from "../../assets/icons/close.svg";
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
            <img
              className="header__menu-icon"
              src={closeIcon}
              alt=""
              aria-hidden="true"
            />
          ) : (
            <img
              className="header__menu-icon"
              src={menuIcon}
              alt=""
              aria-hidden="true"
            />
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
