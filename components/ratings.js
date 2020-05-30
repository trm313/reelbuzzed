const Rating = ({ rating: { Source, Value } }) => {
  return (
    <div className="flex flex-col items-center mr-4">
      <p className="text-lg text-gray-600">{Value}</p>
      <p className="text-xs text-gray-400">{Source}</p>
    </div>
  );
};

const Ratings = ({ ratings }) => {
  return (
    <div className="flex">
      {ratings.map((r) => (
        <Rating rating={r} key={`rating-${r.Source}`} />
      ))}
    </div>
  );
};

export default Ratings;
