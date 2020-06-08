import Link from "next/link";
import LazyLoad from "react-lazyload";
import { differenceInDays } from "date-fns";

import Ratings from "../components/ratings";

const MovieItem = ({ movie: { id, Movie, Year, omdb, slug, Created } }) => {
  return (
    <li className={`my-4 flex`} style={{ height: "125px" }}>
      <div className="" style={{ minWidth: "85px" }}>
        <LazyLoad height={125}>
          <img src={omdb.Poster} style={{ height: "125px" }} />
        </LazyLoad>
      </div>

      <div className="ml-4 flex flex-col justify-around py-1">
        <Link href="/movies/[...id]" as={`/movies/${slug.join("/")}`}>
          <a className="">
            <span>
              {Movie} ({Year})
            </span>
            {differenceInDays(new Date(), new Date(Created)) <= 7 && (
              <span className="uppercase text-2xs ml-2 py-1 px-2 rounded bg-green-400 text-white">
                New
              </span>
            )}
          </a>
        </Link>
        <Ratings size="sm" ratings={omdb.Ratings} id={id} />
      </div>
    </li>
  );
};

export default MovieItem;
