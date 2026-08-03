import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          &copy; {currentYear} Supersite, Powered by News API
        </p>
        <nav className="footer__nav">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            href="https://tripleten.com"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            TripleTen
          </a>
          <a
            href="https://github.com"
            className="footer__link footer__social-link"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            GH
          </a>
          <a
            href="https://linkedin.com"
            className="footer__link footer__social-link"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            in
          </a>
        </nav>
      </div>
    </footer>
  );
}
