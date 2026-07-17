import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          &copy; {currentYear} News Explorer, Powered by News API
        </p>
        <nav className="footer__nav">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <Link to="/saved-news" className="footer__link">
            Saved Articles
          </Link>
        </nav>
      </div>
    </footer>
  );
}
