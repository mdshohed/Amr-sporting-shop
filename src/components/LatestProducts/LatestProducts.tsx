import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { TProduct } from "@/types/types";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import LoadingSpinner from "@/pages/shared/LoadingSpinner";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const { data, isLoading: apiLoading } = useGetAllProductsQuery(undefined, {
    pollingInterval: 30000,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [latestProduct, setLatestProduct] = useState<TProduct[]>([]);

  useEffect(() => {
    if (data && data.data) {
      const latest = [...data.data].sort(
        (a: { createdAt: string }, b: { createdAt: string }) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      );
      setLatestProduct(latest);
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!apiLoading) {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [apiLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto container max-w-7xl px-4">
      <div className="p-5 my-[30px] text-center">
        <h1 className="text-[25px] sm:text-[35px] lg:text-[45px]">
          Latest Products
        </h1>
        <p className="text-[15px] lg:text-[18px]">
          Check & Get Your Desired Product!
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {latestProduct?.slice(0, 8).map((item: TProduct, index: number) => (
          <ProductCard key={index} item={item}></ProductCard>
        ))}
      </div>
      <div>
        {latestProduct && latestProduct.length > 5 ? (
          <Link
            to="/all-sporting-goods"
            className="text-orange-500  mt-8 hover:ms-1.5 hover:duration-100 justify-center font-semibold text-md hover:underline flex items-center"
          >
            See All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" mt-1 ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default LatestProducts;
