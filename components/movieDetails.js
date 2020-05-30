import utilStyles from "../styles/utils.module.css";
const MovieDetails = ({ movie: { Movie, Year, omdb } }) => {
  return (
    <div>
      <h1 className={utilStyles.headingXl}>
        {Movie} ({Year}) Drinking Game
      </h1>
      <div className="text-xs flex items-center justify-around">
        <p>{omdb.Genre}</p>
        <p>{omdb.Rated}</p>
        <p>{omdb.Runtime}</p>
      </div>
      <p className="my-4">{omdb.Plot}</p>
      <p className="my-4">Cast: {omdb.Actors}</p>
      {omdb.Awards && <p className="my-4">Awards: {omdb.Awards}</p>}
    </div>
  );
};

export default MovieDetails;
