const styles = {
  sm: {
    Container: "flex flex-col items-center mr-4",
    Value: "text-sm text-gray-600",
    Source: "text-2xs text-gray-400",
  },
  lg: {
    Container: "flex flex-col items-center mr-4",
    Value: "text-lg text-gray-600",
    Source: "text-xs text-gray-400",
  },
};

const ratingNames = {
  "Internet Movie Database": {
    shortName: "IMDb",
    shortVal: (val) => val.split("/")[0],
  },
  "Rotten Tomatoes": {
    shortName: "RT",
    shortVal: (val) => val,
  },
  "Metacritic": {
    shortName: "Meta",
    shortVal: (val) => val.split("/")[0],
  },
};

const RatingSm = ({ rating: { Source, Value } }) => (
  <div className="flex items-end text-gray-600 mr-4">
    <p className="text-lg leading-none">
      {ratingNames[Source].shortVal(Value)}
    </p>
    <p className="ml-1 text-2xs leading-none">
      {ratingNames[Source].shortName}
    </p>
  </div>
);

const RatingLg = ({ size, rating: { Source, Value } }) => {
  return (
    <div className={styles[size].Container}>
      <p className={styles[size].Value}>{Value}</p>
      <p className={styles[size].Source}>{Source}</p>
    </div>
  );
};

const Ratings = ({ ratings, size = "lg", id }) => {
  if (size === "lg") {
    return (
      <div className="flex">
        {ratings.map((r) => (
          <RatingLg size={size} rating={r} key={`rating-${r.Source}`} />
        ))}
      </div>
    );
  }

  if (size === "sm") {
    return (
      <div className="flex items-center">
        {ratings.map((r) => (
          <RatingSm rating={r} key={`rating-${r.Source}-${r.id}`} />
        ))}
      </div>
    );
  }
};

export default Ratings;
