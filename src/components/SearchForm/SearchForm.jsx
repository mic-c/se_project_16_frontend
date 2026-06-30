import React, { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch, isLoading }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setInputError("Please enter a keyword");
      return;
    }
    setInputError("");
    onSearch(searchQuery.trim());
    setSearchQuery("");
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    if (inputError) setInputError("");
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form-field">
        <input
          type="text"
          className={`search-form-input ${
            inputError ? "search-form-input_error" : ""
          }`}
          placeholder="Search for news"
          value={searchQuery}
          onChange={handleChange}
          disabled={isLoading}
        />
        {inputError && <span className="search-form-error">{inputError}</span>}
      </div>
      <button type="submit" className="search-form-button" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
