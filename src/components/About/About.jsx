import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-text-block">
          <h2 className="about-title">About the Author</h2>
          <p className="about-text">
            News Explorer is a web application that helps you discover and
            explore news articles from around the world. Built with modern web
            technologies, this project demonstrates best practices in React
            development, component architecture, and API integration.
          </p>
          <p className="about-text">
            The application fetches news from a reliable news API and provides
            an intuitive interface for searching, browsing, and saving your
            favorite articles.
          </p>
        </div>
        <div className="about-image-block">
          <div className="about-author-photo" aria-label="Author photo" />
        </div>
      </div>
    </section>
  );
}
