import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image-block">
          <div className="about__author-photo" aria-label="Author photo" />
        </div>
        <div className="about__text-block">
          <h2 className="about__title">About the Author</h2>
          <p className="about__text">
            Hi, I’m Chukwuka. I built News Explorer to help people discover and
            explore news from around the world through a clean and intuitive
            interface.
          </p>
          <p className="about__text">
            This project reflects my work with React, component-based
            architecture, and API integration while focusing on responsive,
            user-friendly design.
          </p>
        </div>
      </div>
    </section>
  );
}
