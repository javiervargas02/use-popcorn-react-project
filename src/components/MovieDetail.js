import React from "react";

export default function MovieDetail({ selectedId, closeMovie }) {
  return (
    <div className="detail">
      <button className="btn-back" onClick={closeMovie}>
        &larr;
      </button>
      {selectedId}
    </div>
  );
}
