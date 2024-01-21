import React from "react";
import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, handleRemove }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleRemove={handleRemove}
        />
      ))}
    </ul>
  );
}
