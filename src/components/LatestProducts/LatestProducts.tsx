import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { TProduct } from "@/types/types";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";



const LatestProducts = () => {
  const { data, error } = useGetAllProductsQuery(undefined, { pollingInterval: 30000 });

const [latestProduct, setLatestProduct] = useState<TProduct[]>([]);

useEffect(() => {
  if (data && data.data) {
    const latest = [...data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setLatestProduct(latest);
  }
}, [data]);


  return (
    <div className="mx-auto container max-w-7xl px-4">
      <div className="p-5 text-center">
        <h1 className="text-[25px] sm:text-[35px] lg:text-[45px]">Featured Products</h1>
        <p className="text-[15px] lg:text-[18px]">Check & Get Your Desired Product!</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {
          latestProduct?.map( (item: TProduct, index:number)=>(
            <ProductCard key={index} item={item}></ProductCard>
          ))
        }
       
      </div>
      
    </div>
  );
};

export default LatestProducts;