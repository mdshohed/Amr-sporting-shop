import { Star } from "lucide-react";
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

  return (
    <div>
      <Card className=" text-white border border-gray-200 rounded-none p-3 ">
        {/* <Link to={`/all-sporting-goods`}> */}
        <CardHeader className="">
          <img
            src={cardImg}
            className=" object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt="image"
          />
        </CardHeader>
        <CardContent className="grid text-gray-700 h-[250px]">
          <div className="flex items-center gap-2">
            <Star color="orange" fill="orange" className="w-[18px]" />
            <p className="text-[18px] font-bold ">{item?.rating}</p>
          </div>
          <p className="text-md ">{item?.description}</p>
          <CardTitle className="mt-1 text-2xl font-normal">
            {item?.name}
          </CardTitle>
          <p className="text-3xl mt-2 font-medium">
            <span className="font-light">$</span>
            {item?.price}
          </p>
          <p className="font-mono mt-2 text-sm text-white bg-red-600 rounded-sm w-[90px] text-center flex justify-center items-center gap-1">
            {/* <Clock className="w-[12px] "/> */}
            Save: 25%
          </p>
          <p className="text-sm mt-2">
            <span className="text-lime-500 font-semibold">Free Delivery </span>
            from Bangladesh
          </p>
        </CardContent>
        <div className="text-gray-700 px-6">
          <button
            onClick={()=>handleViewPage(item?._id)}
            className="btn py-1 px-2 border rounded-2xl hover:border-2 hover:border-lime-500"
          >
            View Details
          </button>
        </div>
        {/* </Link> */}
        {/* <CardFooter className="p-4 border-t border-gray-700">
          <RatingModal movie={movie} />
        </CardFooter> */}
      </Card>
      {/* name, 
      category, 
      stock-quantity, 
      brand, 
      rating, 
      description, 
      price, 
      image, 
      view-details */}
    </div>
  );
};

export default ProductCard;
