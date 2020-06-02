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

const Rating = ({ size, rating: { Source, Value } }) => {
  return (
    <div className={styles[size].Container}>
      <p className={styles[size].Value}>{Value}</p>
      <p className={styles[size].Source}>{Source}</p>
    </div>
  );
};

const Ratings = ({ ratings, size = "lg" }) => {
  return (
    <div className="flex justify-center">
      {ratings.map((r) => (
        <Rating size={size} rating={r} key={`rating-${r.Source}`} />
      ))}
    </div>
  );
};

export default Ratings;
