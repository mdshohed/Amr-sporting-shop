
import { useMediaQuery } from 'react-responsive';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
// import { RatingModal } from "../RatingModal/RatingMdal";
import cardImg from "../../assets/images/shos-1.jpg";
import { TProduct } from "@/types/types";

const ProductCard = ({ item }: { item: TProduct }) => {
  const navigate = useNavigate(); 
  const handleViewPage = (id: string | number) =>{
    navigate(`/all-sporting-goods/${id}`)
  }

  const isLgOrUp = useMediaQuery({ query: '(min-width: 1024px)' });

  const description = item?.description || '';
  
  const shortDescription = isLgOrUp 
    ? description.split(' ').slice(0, 25).join(' ') 
    : description.slice(0, 15);


  return (
    <div>
      <Card className=" text-white   rounded-none p-3 ">
        {/* <Link to={`/all-sporting-goods`}> */}
        <CardHeader className="h-[250px]  mx-auto flex justify-center items-center">
          <img
            src={item.image ? item.image : cardImg}
            className=" overflow-hidden rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt="image"
          />
        </CardHeader>
        <CardContent className="grid text-gray-700 lg:h-[280px] h-[280px]">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg bg-yellow-500 py-1 px-2 w-max">
                <svg
                  width="14"
                  height="14"
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
                <span className="text-base font-medium text-white">{item?.rating}</span>
              </button>
          </div>
          
          <CardTitle className="mt-1 text-2xl font-normal">
            {item?.name}
          </CardTitle>
          <p className="text-md ">{shortDescription}...</p>
          <p className="text-md mt-2 font-medium">
            {item?.category} / {item?.brand}
          </p>
          <p className="text-xl md:text-3xl flex  mt-2 font-medium">
            <span className="font-light">$</span>
            {item?.price} <span className="ml-3 font-semibold text-sm whitespace-nowrap md:text-xl text-indigo-600 ">
                  15% off</span>
          </p>
          <p className="text-lg mt-2 font-medium">
            <span className="font-light">In-Stock: </span>
            {item?.stockQuantity}
          </p>
        </CardContent>
        <div className="text-gray-700 px-6">
          <button
            onClick={()=>handleViewPage(item?._id)}
            className="btn py-1 bg-white px-2 rounded-2xl border-2 hover:border-2 hover:border-lime-500"
          >
            View Details
          </button>
        </div>
        {/* </Link> */}
        {/* <CardFooter className="p-4 border-t border-gray-700">
          <RatingModal movie={movie} />
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default ProductCard;
