import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <p className="error">
        <span>❌</span> {message}
      </p>
    </div>
  );
}
