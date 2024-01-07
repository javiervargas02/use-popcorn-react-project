import React from "react";

export default function Search({ query, handleChange }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={({ target }) => handleChange(target.value)}
    />
  );
}
