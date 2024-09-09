
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import cardImg from '../../assets/images/shos-1.jpg'


const CategoryCard = () => {
  return (
    <Card className="bg-white-800 w-[300px] bg-white  text-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link to={`/all-sporting-goods`}>
        <CardHeader className="p-5">
          <img
            src={cardImg}
            className=" object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt="image"
          />
        </CardHeader>
        <CardContent className="grid p-4">
          <CardTitle className="text-center text-xl font-normal">{"Football"}</CardTitle>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CategoryCard;