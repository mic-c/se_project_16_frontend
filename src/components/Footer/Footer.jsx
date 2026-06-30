import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-copyright">
          &copy; {currentYear} News Explorer, Powered by News API
        </p>
        <nav className="footer-nav">
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/saved-news" className="footer-link">
            Saved Articles
          </Link>
        </nav>
      </div>
    </footer>
  );
}
