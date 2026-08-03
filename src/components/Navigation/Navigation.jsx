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
                <svg
                  className="navigation__logout-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M10 7H6V17H10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 12H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17 9L20 12L17 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
