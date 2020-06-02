import Link from "next/link";

import Ratings from "../components/ratings";

const MovieItem = ({ movie: { id, Movie, Year, omdb, slug } }) => {
  return (
    <li className={`my-4 flex`} style={{ height: "125px" }}>
      <img src={omdb.Poster} style={{ height: "125px" }} />
      <div className="ml-4 flex flex-col justify-around py-1">
        <Link href="/movies/[...id]" as={`/movies/${slug.join("/")}`}>
          <a>
            {Movie} ({Year})
          </a>
        </Link>
        <Ratings size="sm" ratings={omdb.Ratings} id={id} />
      </div>
    </li>
  );
};

export default MovieItem;
