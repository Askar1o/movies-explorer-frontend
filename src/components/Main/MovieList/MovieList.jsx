import React from "react";
import "./MovieList.css";
import Movie from "../Movie/Movie";
import { useLocation } from "react-router-dom";
import { films } from "../../../data/dataMovies";
import { DeviceContext } from "../../../contexts/DeviceContext/DeviceContext";
import { useContext, useEffect, useState } from "react";

function MovieList() {
  const device = useContext(DeviceContext);
  const location = useLocation();
  const [movies, setMovies] = useState(films);
  const [showMoreFilmsButton, setShowMoreFilmsButton] = useState(true);
  const [firstRenderCount, setFirstRenderCount] = useState(0);
  const [page, setPage] = useState(false);

  useEffect(() => {
    const calcFilmsToRender = (device) => {
      const setForFilmsRender = {
        desktop: {
          renderCount: 12,
          addedRender: 3,
        },
        tablet: {
          renderCount: 8,
          addedRender: 2,
        },
        mobile: {
          renderCount: 5,
          addedRender: 1,
        },
      };

      return (
        setForFilmsRender[device].renderCount +
        setForFilmsRender[device].addedRender * page
      );
    };

    setFirstRenderCount(calcFilmsToRender(device));
  }, [device, movies, page]);

  const handleClickRenderMore = () => {
    setShowMoreFilmsButton(false);
    setTimeout(() => {
      setShowMoreFilmsButton(true);
      setPage((e) => e + 1);
    }, 1000);
  };

  return (
    <main className="movies">
      <ul className="movies__list">
        {location.pathname === "/movies"
          ? movies.slice(0, firstRenderCount).map((film) => {
              return (
                <Movie
                  key={film._id}
                  name={film.name}
                  duration={film.duration}
                  link={film.link}
                  saved={film.saved}
                />
              );
            })
          : movies
              .filter((film) => film.saved)
              .map((film) => {
                return (
                  <Movie
                    key={film._id}
                    name={film.name}
                    duration={film.duration}
                    link={film.link}
                    saved={film.saved}
                  />
                );
              })}
      </ul>
      <div className="movies__container">
        {showMoreFilmsButton && (
          <button
            type="button"
            className={
              location.pathname === "/movies"
                ? "movies__show-more-button"
                : "movies__show-more-button movies__show-more-button_inactive"
            }
            onClick={handleClickRenderMore}
          >
            Ещё
          </button>
        )}
      </div>
    </main>
  );
}

export default MovieList;
