import { useGetSingleProductQuery } from "@/redux/features/products/productApi";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-photo-view/dist/react-photo-view.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/card/cardSlice";
import { toast } from "sonner";
import StarRating from "@/components/Rating/StarRating";

const ProductView = () => {
  const { id } = useParams();
  const { data } = useGetSingleProductQuery(id);
  const dispatch = useAppDispatch();

  const products = useAppSelector((store) => store.cart.products);

  const [quantity, setQuantity] = useState(1);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (data && data.data) {
      const foundProduct = products.find(
        (product: any) => product._id === data?.data?._id
      );
      const cardQuantity = foundProduct ? foundProduct.quantity : 0;
      const stockQty = data?.data?.stockQuantity;
      if (stockQty <= cardQuantity) {
        setFlag(true);
      }
    }
  }, [data, products]);

  const handleQuantityChangePlus = (value: number) => {
    const foundProduct = products.find(
      (product: any) => product._id === data?.data?._id
    );
    const cardQuantity = foundProduct ? foundProduct.quantity : 0;

    const stockQty = data?.data?.stockQuantity;
    console.log("current", data?.data, cardQuantity, cardQuantity + value);
    setQuantity(value);
    if (stockQty >= cardQuantity + value) {
      setFlag(false);
    } else {
      setFlag(true);
      toast.error("Stock Quantity limit Out");
    }
  };

  const handleQuantityChangeMinus = (value: number) => {
    const foundProduct = products.find(
      (product: any) => product._id === data?.data?._id
    );
    const cardQuantity = foundProduct ? foundProduct.quantity : 0;
    const stockQty = data?.data?.stockQuantity;
    setQuantity(value);
    if (stockQty >= cardQuantity + value) {
      setFlag(false);
    }
  };

  const handleAddToCart = (product: any) => {
    const payload = { product, quantity };

    dispatch(addToCart(payload));
    toast.success("Added to Card Successfully");
    setQuantity(1);
  };

  return (
    <section className="py-10 lg:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="md:col-span-3 text-center">
              <div className="md:h-[450px] p-4 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                {/* <PhotoProvider> */}
                  {/* <PhotoView src="https://readymadeui.com/images/sunglass7.webp"> */}
                  <img
                    src={data?.data.image}
                    alt="Product"
                    className="md:w-11/12 w-full h-full  rounded object-contain object-top"
                  />
                  {/* </PhotoView> */}
                {/* </PhotoProvider> */}
              </div>

              {/* <div className="flex flex-wrap gap-4 mx-auto mt-4">
                <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                  <img
                    src="https://readymadeui.com/images/sunglass1.webp"
                    alt="Product2"
                    className="w-20 h-16 object-contain"
                  />
                </div>
                <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                  <img
                    src="https://readymadeui.com/images/sunglass2.webp"
                    alt="Product3"
                    className="w-20 h-16 object-contain"
                  />
                </div>
                <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                  <img
                    src="https://readymadeui.com/images/sunglass3.webp"
                    alt="Product4"
                    className="w-20 h-16 object-contain"
                  />
                </div>
                <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                  <img
                    src="https://readymadeui.com/images/sunglass5.webp"
                    alt="Product5"
                    className="w-20 h-16 object-contain"
                  />
                </div>
              </div> */}
            </div>
          </div>

          {/* Product Details */}
          <div className="pro-detail w-full flex flex-col justify-around order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto">
            
            <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">
              {data?.data?.name}
            </h2>

            <p className="text-gray-500 my-2 text-base font-normal">
              {data?.data?.description}
            </p>

            <div className="flex flex-row sm:flex-row sm:items-center ">
              <div className="flex items-center">
                <h5 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 ">
                  ${data?.data?.price}
                </h5>
                <span className="ml-3 font-semibold text-lg text-indigo-600 ">
                  15% off
                </span>
              </div>
              <svg
                className="mx-3  max-[400px]:hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="36"
                viewBox="0 0 2 36"
                fill="none"
              >
                <path d="M1 0V36" stroke="#E5E7EB" />
              </svg>
              {/* <button className="flex  items-center justify-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_12657_16865)">
                    <path
                      d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                      fill="white"
                    />
                    <g clip-path="url(#clip1_12657_16865)">
                      <path
                        d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_12657_16865">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                    <clipPath id="clip1_12657_16865">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-base font-medium text-white">{data?.data?.rating}</span>
              </button> */}
              <StarRating rating={data?.data?.rating}></StarRating> {data?.data?.rating}
            </div>

            <p className="font-medium my-2 border-t-2 w-48 whitespace-nowrap pt-2 text-md text-gray-600">
              Available: <span className={`font-bold ${data?.data?.stockQuantity==0 ? 'text-red-500' : data?.data?.stockQuantity<=5 ? 'text-yellow-400' : 'text-blue-500'}`}>{data?.data?.stockQuantity==0 ? "Out of Stock" : "In Stock"}</span>
            </p>

            <p className="font-medium my-2 text-md text-gray-600">
              Category: <span className="text-black font-bold">{data?.data?.category}</span>
            </p>

            <p className="font-medium text-md text-gray-600 my-2">
              Brand: <span className="text-black font-bold">{data?.data?.brand}</span>
            </p>

            <p className="text-gray-500 text-lg my-2 font-medium">
              Stock-Quantity: <span className="font-bold text-black">{data?.data?.stockQuantity} </span>
            </p>


            {/* Color Options */}
            <div className="block w-full">
             
            </div>

            {/* Quantity and Add to Cart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center justify-center w-full">
                <button
                  className="group py-4 px-6 border border-gray-400 rounded-l-full shadow-sm transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
                  onClick={() =>
                    handleQuantityChangeMinus(Math.max(1, quantity - 1))
                  }
                >
                  <svg
                    className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 11H5.5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  value={quantity}
                  className="font-semibold text-gray-900 text-lg py-[13px] px-6 w-full lg:max-w-[118px] border-y border-gray-400 bg-transparent text-center"
                  min="1"
                />
                <button
                  className="group py-4 px-6 border border-gray-400 rounded-r-full shadow-sm transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
                  onClick={() => handleQuantityChangePlus(quantity + 1)}
                >
                  <svg
                    className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 5.5V16.5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.5 11H5.5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <button
                disabled={flag}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(data?.data);
                }}
                className="w-full disabled:bg-indigo-300 bg-indigo-600 text-white py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-2xl font-semibold my-5">Description</p>
          <p className="text-lg ">{data?.data?.productDescription}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductView;
