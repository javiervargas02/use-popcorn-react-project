import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import ResultsCount from "./components/ResultsCount";
import MovieList from "./components/MovieList";
import WatchedMovieSummary from "./components/WatchedMovieSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const API_KEY = "450b0533";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleAddWatched = (movie) => {
    if (
      watched.some(
        (watchedMovie) =>
          watchedMovie.imdbID === movie.imdbID &&
          watchedMovie.userRating !== movie.userRating
      )
    ) {
      setWatched((prev) =>
        prev.map((watchedMovie) =>
          watchedMovie.imdbID === movie.imdbID
            ? { ...watchedMovie, userRating: movie.userRating }
            : watchedMovie
        )
      );
    } else if (
      !watched.some((watchedMovie) => watchedMovie.imdbID === movie.imdbID)
    ) {
      setWatched((prev) => [...prev, movie]);
    }
    setSelectedMovieId(null);
  };

  useEffect(() => {
    if (query === "" || query.trim().length < 3) {
      return;
    }

    const getMovies = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        if (!res.ok) {
          throw new Error("The data could not be retrieved");
        }
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    getMovies();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} handleChange={setQuery} />
        <ResultsCount movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              selectMovie={(id) =>
                setSelectedMovieId(id === selectedMovieId ? null : id)
              }
            />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetail
              selectedId={selectedMovieId}
              closeMovie={() => setSelectedMovieId(null)}
              addWatchedMovie={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
