import React from "react";
import Movie from "./Movie";

export default function MovieList({ movies, selectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} selectMovie={selectMovie} />
      ))}
    </ul>
  );
}
