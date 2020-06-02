import Link from "next/link";

import Ratings from "../components/ratings";

const MovieItem = ({
  movie: { id, Movie, Year, ImdbRating, RottenTomatoesRating, slug },
}) => {
  return (
    <li className={`my-4`}>
      <Link href="/movies/[...id]" as={`/movies/${slug.join("/")}`}>
        <a>
          {Movie} ({Year})
        </a>
      </Link>
      <br />
      <Ratings
        ratings={[
          {
            Source: "Internet Movie Database",
            Value: ImdbRating + "/10",
          },
          {
            Source: "Rotten Tomatoes",
            Value: Math.round(RottenTomatoesRating * 100) + "%",
          },
        ]}
      />
    </li>
  );
};

export default MovieItem;
