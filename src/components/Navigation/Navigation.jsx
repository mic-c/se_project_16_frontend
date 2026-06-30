import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({
  isLoggedIn,
  onLoginClick,
  onLogoutClick,
}) {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className="navigation-item">
          <Link to="/" className="navigation-link navigation-link_active">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="navigation-item">
              <Link to="/saved-news" className="navigation-link">
                Saved Articles
              </Link>
            </li>
            <li className="navigation-item">
              <button className="navigation-button" onClick={onLogoutClick}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="navigation-item">
            <button className="navigation-button" onClick={onLoginClick}>
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
