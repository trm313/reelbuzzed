import React, { useState, useEffect } from "react";
import styles from "./movieSearch.module.scss";

import * as gtag from "../lib/gtag";

const MovieSearch = ({ allMovies, setVisibleMovieList }) => {
  const [searchInput, setSearchInput] = useState("");

  const logFailedSearch = (term) => {
    gtag.event({
      action: "search",
      category: "No Search Results",
      label: term,
    });
  };

  useEffect(() => {
    let filteredMovies = allMovies.filter((m) => {
      return m.Movie.toLowerCase().indexOf(searchInput.toLowerCase()) != -1;
    });

    if (filteredMovies.length == 0) {
      logFailedSearch(searchInput);
    }

    setVisibleMovieList(filteredMovies);
  }, [searchInput]);

  return (
    <div className="">
      <div className="flex">
        <i className={`ri-search-2-line text-gray-600 ${styles.searchIcon}`} />

        <input
          className="px-12 form-input leading-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search movies"
        />
        <i
          className={`ri-close-fill text-gray-600 hover:text-gray-800 ${styles.clearIcon}`}
          onClick={() => setSearchInput("")}
        />
      </div>
    </div>
  );
};

export default MovieSearch;
