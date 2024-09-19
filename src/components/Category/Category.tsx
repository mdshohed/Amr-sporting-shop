import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";


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

  const textRef = useRef(null);
  useEffect(() => {
    gsap.from(textRef.current, {
      opacity: 100,
      x: -100,
      duration: 1,
      ease: "power2.Out",
    });
  }, []);
  
  return (
    <div className="max-w-7xl px-4 mx-auto container mt-10">
      <div className="p-5 text-center ">
        <h1 
        // ref={textRef}
        className="text-[25px] sm:text-[35px] lg:text-[45px]">Featured Category</h1>
        <p className="mt-4 lg:mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Get Your Desired Product from Featured Category!
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-3 mx-auto">
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

