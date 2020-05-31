import Ratings from "./ratings";

import utilStyles from "../styles/utils.module.css";

const MovieDetails = ({ movie: { Movie, Year, omdb } }) => {
  return (
    <div>
      <h1 className={utilStyles.headingXl}>
        {Movie} ({Year}) Drinking Game
      </h1>
      <div className="text-xs flex items-center justify-around">
        <p className="tag">{omdb.Genre}</p>
        <p className="tag">{omdb.Rated}</p>
        <p className="tag">{omdb.Runtime}</p>
      </div>
      <div className="flex justify-center mt-4">
        <Ratings ratings={omdb.Ratings} />
      </div>
      <div className="mt-8">
        <p className="label">Summary</p>
        <p className="mb-4">{omdb.Plot}</p>
        <p className="label">Cast</p>
        <p className="mb-4">{omdb.Actors}</p>
        {omdb.Awards && (
          <>
            <p className="label">Awards</p>
            <p className="mb-4">{omdb.Awards}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
