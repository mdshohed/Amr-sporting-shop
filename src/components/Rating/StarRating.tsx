

const StarRating = ({ rating }: {rating:number }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating>5 ? 5: rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        if (index < filledStars) {
          return (
            <span key={index} className="text-yellow-500 text-2xl">★</span>
          );
        }
        if (index === filledStars && hasHalfStar) {
          return (
            <span key={index} className="text-yellow-500 text-2xl relative">
              ★
              <span className="absolute left-0 text-gray-300">☆</span>
            </span>
          );
        }
        return (
          <span key={index} className="text-gray-300 text-2xl">☆</span>
        );
      })}
    </div>
  );
};

export default StarRating;
