import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const API_KEY = "450b0533";

export default function MovieDetail({
  selectedId,
  closeMovie,
  addWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  let initialRating = 0;

  watched.forEach((watchedMovie) => {
    if (watchedMovie.imdbID === selectedId) {
      initialRating = watchedMovie.userRating;
    }
  });

  const isAddButtonVisible = userRating > 0 && initialRating !== userRating;
  const isWatchedButtonVisible =
    (userRating === 0 && initialRating > 0) ||
    (initialRating === userRating && userRating !== 0 && initialRating !== 0);

  const handleAddWatched = () => {
    const new_watched_movie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    addWatchedMovie(new_watched_movie);
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        if (!res.ok) {
          throw new Error("The data could not be retrieved");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovie(data);
      } catch (err) {
        console.error(err);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    };
    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={closeMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={25}
                onSetRating={setUserRating}
                initialRating={initialRating}
              />
              {isAddButtonVisible && (
                <button className="btn-add" onClick={handleAddWatched}>
                  {initialRating > 0
                    ? "Update rating"
                    : "+ Add to watched list"}
                </button>
              )}
              {isWatchedButtonVisible && (
                <span className="btn-add-disabled">✅ Wacthed</span>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
