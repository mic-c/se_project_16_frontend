import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

export default function Header({ isLoggedIn, onLoginClick, onLogoutClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo" aria-label="News Explorer home">
          News Explorer
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />
      </div>
    </header>
  );
}
