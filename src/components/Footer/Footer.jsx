import React from "react";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/icons/github.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
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
            href="https://github.com/mic-c"
            className="footer__link footer__social-link"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <img src={githubIcon} alt="" aria-hidden="true" />
          </a>
          <a
            href="https://linkedin.com"
            className="footer__link footer__social-link"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img src={linkedinIcon} alt="" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
