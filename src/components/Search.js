import useKey from "../hooks/useKey";
import { useRef } from "react";

export default function Search({ query, setQuery }) {
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
