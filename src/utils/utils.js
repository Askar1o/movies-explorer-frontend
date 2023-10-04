export const apiConfig = {
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const createData = (data, query) => {
  const { searchString, isShortMovie } = query;
  const regExpForNonWordSymbols = /[ !,.\-'";:`{}(%«»]/g;
  if (isShortMovie) {
    return data.filter(
      (movie) =>
        movie.nameRU
          .trim()
          .toLowerCase()
          .replace(regExpForNonWordSymbols, "")
          .includes(
            searchString
              .toLowerCase()
              .trim()
              .replace(regExpForNonWordSymbols, "")
          ) && movie.duration <= 40
    );
  } else {
    return data.filter((movie) =>
      movie.nameRU
        .trim()
        .toLowerCase()
        .replace(regExpForNonWordSymbols, "")
        .includes(
          searchString.toLowerCase().trim().replace(regExpForNonWordSymbols, "")
        )
    );
  }
};
