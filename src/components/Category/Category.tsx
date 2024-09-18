import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useEffect, useState } from "react";


const Category = () => {
  const { data: products, error} = useGetAllProductsQuery(null); 
  const [categoryList, setCategory] = useState([]);

  useEffect(()=>{
    if( products && products.data){
      const categoryList = products.data.reduce((acc, item) => {
        if (!acc.some(categoryObj => categoryObj.category === item.category)) {
          acc.push({ category: item.category, image: item.image });
        }
        return acc; 
      }, []);   
      
      setCategory(categoryList);
    }
    
    
  },[products])
  
  return (
    <div className="max-w-7xl px-4 mx-auto container mt-10">
      <div className="p-5 text-center ">
        <h1 className="text-[25px] sm:text-[35px] lg:text-[45px]">Featured Category</h1>
        <p className="text-[15px] lg:text-[18px]">Get Your Desired Product from Featured Category!</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto">
        {
          categoryList.map((item)=>(
            <CategoryCard item={item}></CategoryCard>
          ))
        }
      </div>
      
    </div>
  );
};

export default Category;

// Golf, Cycling, Fitness & Exercise,Camping & Hiking,Airsoft & Paintball,Fishing
// Hunting,Outdoor Optics,Mixed Martial Arts & Boxing,Winter Sports,Football
// Sports Memorabilia & Collectibles

