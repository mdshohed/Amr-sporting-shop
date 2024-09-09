import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { TProduct } from "@/types/types";



const LatestProducts = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/api/products')
    .then(res=>res.json())
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
    .finally()
  },[])

  return (
    <div className="mx-auto container max-w-7xl px-4">
      <div className="p-5 text-center">
        <h1 className="text-[25px] sm:text-[35px] lg:text-[45px]">Featured Products</h1>
        <p className="text-[15px] lg:text-[18px]">Check & Get Your Desired Product!</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {
          data?.map( (item: TProduct)=>(
            <ProductCard item={item}></ProductCard>
          ))
        }
       
      </div>
      
    </div>
  );
};

export default LatestProducts;