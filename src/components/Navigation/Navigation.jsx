import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({
  isLoggedIn,
  currentUserName,
  onLoginClick,
  onLogoutClick,
  isDarkTheme,
  isMenuOpen,
  onCloseMenu,
}) {
  const handleLoginClick = () => {
    onCloseMenu();
    onLoginClick();
  };

  const handleLogoutClick = () => {
    onCloseMenu();
    onLogoutClick();
  };

  return (
    <nav
      className={`navigation${isDarkTheme ? " navigation_theme_dark" : ""}${
        isMenuOpen ? " navigation_mobile-open" : ""
      }`}
    >
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link${isActive ? " navigation__link_active" : ""}`
            }
            onClick={onCloseMenu}
            end
          >
            Home
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li className="navigation__item">
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `navigation__link${isActive ? " navigation__link_active" : ""}`
                }
                onClick={onCloseMenu}
              >
                Saved articles
              </NavLink>
            </li>
            <li className="navigation__item">
              <button
                className="navigation__auth-button navigation__auth-button_logged-in"
                onClick={handleLogoutClick}
              >
                <span className="navigation__user-name">
                  {currentUserName || "User"}
                </span>
                <span className="navigation__logout-icon" aria-hidden="true" />
              </button>
            </li>
          </>
        ) : (
          <li className="navigation__item">
            <button
              className="navigation__auth-button"
              onClick={handleLoginClick}
            >
              Sign in
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
