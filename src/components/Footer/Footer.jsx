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
            href="https://github.com/mic-c"
            className="footer__link footer__social-link"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 2C5.58 2 2 5.67 2 10.21C2 13.84 4.29 16.93 7.47 18.01C7.87 18.09 8.01 17.84 8.01 17.63C8.01 17.44 8 16.79 8 16.1C5.8 16.59 5.34 15.13 5.34 15.13C4.98 14.18 4.45 13.93 4.45 13.93C3.73 13.42 4.5 13.43 4.5 13.43C5.3 13.49 5.72 14.28 5.72 14.28C6.43 15.52 7.59 15.16 8.05 14.95C8.12 14.42 8.33 14.06 8.56 13.86C6.8 13.65 4.95 12.95 4.95 9.83C4.95 8.94 5.26 8.22 5.78 7.66C5.7 7.46 5.42 6.62 5.86 5.49C5.86 5.49 6.53 5.27 8 6.3C8.64 6.12 9.32 6.03 10 6.03C10.68 6.03 11.36 6.12 12 6.3C13.47 5.27 14.14 5.49 14.14 5.49C14.58 6.62 14.3 7.46 14.22 7.66C14.74 8.22 15.05 8.94 15.05 9.83C15.05 12.96 13.19 13.65 11.43 13.85C11.72 14.09 11.97 14.57 11.97 15.31C11.97 16.37 11.96 17.23 11.96 17.63C11.96 17.84 12.1 18.1 12.51 18.01C15.69 16.93 18 13.84 18 10.21C18 5.67 14.42 2 10 2Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            className="footer__link footer__social-link"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4.44 6.11C5.36 6.11 6.11 5.36 6.11 4.44C6.11 3.52 5.36 2.78 4.44 2.78C3.52 2.78 2.78 3.52 2.78 4.44C2.78 5.36 3.52 6.11 4.44 6.11ZM3.06 7.5H5.83V16.39H3.06V7.5ZM7.5 7.5H10.16V8.71H10.19C10.56 8.01 11.46 7.28 12.81 7.28C15.61 7.28 16.11 9.12 16.11 11.5V16.39H13.33V12.06C13.33 11.03 13.31 9.72 11.91 9.72C10.49 9.72 10.28 10.83 10.28 11.99V16.39H7.5V7.5Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
}
