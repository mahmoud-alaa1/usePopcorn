import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import useMovies from "./hooks/useMovies";
import useLocalStorageState from "./hooks/useLocalStorageState";
import useKey from "./hooks/useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "15e40346";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie(id) {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {error ? (
            <ErrorMessage message={error} />
          ) : isLoading ? (
            <Loader />
          ) : movies.length === 0 ? (
            <p style={{ textAlign: "center", padding: "1rem" }}>
              Search For your favourite movie
            </p>
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                onDeleteWatched={handleDeleteWatched}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🚫</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onInput={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setisOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setisOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const time = watched.reduce((acc, movie) => acc + movie.Runtime, 0);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{time.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          onDeleteWatched={onDeleteWatched}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <div className="watched-movie-details">
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.Runtime} min</span>
          </p>
          <button
            className="btn-delete"
            onClick={() => onDeleteWatched(movie.imdbID)}
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie onSelectMovie={onSelectMovie} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title}`} />
      <div className="title">
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>📆</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </div>
    </li>
  );
}
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);
  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map((elem) => elem.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: Number(movie.Year),
      Poster: movie.Poster,
      Runtime: Number(movie.Runtime.split(" ").at(0)),
      imdbRating: parseFloat(movie.imdbRating),
      userRating,
      countRatingDecision: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useKey("escape", onCloseMovie);

  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = `Movie | ${movie.Title}`;
      return () => {
        document.title = `usePopcorn`;
      };
    },
    [movie.Title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button onClick={onCloseMovie} className="btn-back" type="button">
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of the ${movie.Title}`} />
            <div style={{ width: "fit" }} className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p style={{ textAlign: "center" }}>
                  You rated this movie with {watchedUserRating} ⭐
                </p>
              ) : (
                <>
                  <StarRating
                    onSetRating={setUserRating}
                    maxRating={10}
                    size={24}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
