import CategoryCard from "../CategoryCard/CategoryCard";


const Category = () => {
  
  return (
    <div className="max-w-7xl px-4 mx-auto container">
      <div className="p-5 text-center ">
        <h1 className="text-[25px] sm:text-[35px] lg:text-[45px]">Featured Category</h1>
        <p className="text-[15px] lg:text-[18px]">Get Your Desired Product from Featured Category!</p>
      </div>
      <div className="flex  gap-3 mx-auto">
        <CategoryCard></CategoryCard>
        <CategoryCard></CategoryCard>
        <CategoryCard></CategoryCard>
      </div>
      
    </div>
  );
};

export default Category;

// Golf, Cycling, Fitness & Exercise,Camping & Hiking,Airsoft & Paintball,Fishing
// Hunting,Outdoor Optics,Mixed Martial Arts & Boxing,Winter Sports,Football
// Sports Memorabilia & Collectibles

