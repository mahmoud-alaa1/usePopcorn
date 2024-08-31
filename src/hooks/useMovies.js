import { useState, useEffect } from "react";

const KEY = "15e40346";

export default function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    callback?.();
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          { signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setMovies([]);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // handleCloseMovie();

    if (query) fetchMovies();
    else {
      setMovies([]);
      setError("");
      setIsLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
