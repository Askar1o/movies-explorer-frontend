import { useState } from "react";

export function useSearchFilms(movies) {
  const [sortedMovies, setSortedMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("Введите название фильма");

  const filterMovies = (movies, searchQuery) => {
    const { searchString, isShortMovie } = searchQuery;
    if (isShortMovie) {
      return setSortedMovies(
        movies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) &&
            movie.duration <= 40
        )
      );
    } else {
      return setSortedMovies(
        movies.filter((movie) =>
          movie.nameRU.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }
  };

  const handleSearch = (searchQuery) => {
    setLoading(true);
    filterMovies(movies, searchQuery);

    if (sortedMovies.length === 0) {
      setText("Ничего не найдено");
    }

    if (!searchQuery.searchString) {
      setText("Введите название фильма");
      setSortedMovies([]);
    }

    setTimeout(() => setLoading(false), 300);
  };

  return { sortedMovies, handleSearch, isLoading, text };
}
