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

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie onSelectMovie={onSelectMovie} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
