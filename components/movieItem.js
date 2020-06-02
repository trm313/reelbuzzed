import Link from "next/link";

import Ratings from "../components/ratings";

const MovieItem = ({ movie: { id, Movie, Year, omdb, slug } }) => {
  return (
    <li className={`my-4`}>
      <Link href="/movies/[...id]" as={`/movies/${slug.join("/")}`}>
        <a>
          {Movie} ({Year})
        </a>
      </Link>
      <br />
      <Ratings size="sm" ratings={omdb.Ratings} />
    </li>
  );
};

export default MovieItem;
