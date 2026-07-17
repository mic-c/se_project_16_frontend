import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({
  isLoggedIn,
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
                Saved Articles
              </NavLink>
            </li>
            <li className="navigation__item">
              <button
                className="navigation__auth-button"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="navigation__item">
            <button
              className="navigation__auth-button"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
