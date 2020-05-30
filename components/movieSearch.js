import React, { useState, useEffect } from "react";

const MovieSearch = ({ allMovies, setVisibleMovieList }) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let filteredMovies = allMovies.filter((m) => {
      return m.Movie.toLowerCase().indexOf(searchInput.toLowerCase()) != -1;
    });

    setVisibleMovieList(filteredMovies);
  }, [searchInput]);

  return (
    <div className="">
      <div className="flex">
        <input
          className="form-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="form-button">Search</button>
      </div>
    </div>
  );
};

export default MovieSearch;
