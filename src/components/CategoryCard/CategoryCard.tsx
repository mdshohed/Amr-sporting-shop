
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import cardImg from '../../assets/images/shos-1.jpg'


const CategoryCard = ({item}) => {
  return (
    <Card className="bg-white-800  bg-white   text-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link to={`/all-sporting-goods`}>
        <CardHeader className="  h-[200px] mx-auto">
          <img
            src={item.image}
            className=" overflow-hidden rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt="image"
          />
        </CardHeader>
        <CardContent className="grid pe-5">
          <Link to={"/all-sporting-goods"} className="text-center text-xl font-normal">{item.category}</Link>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CategoryCard;