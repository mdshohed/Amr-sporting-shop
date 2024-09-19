
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import cardImg from '../../assets/images/shos-1.jpg'


const CategoryCard = ({item}: any) => {
  const navigate = useNavigate(); 

  const navigateToProduct = (value: string) => {
    console.log("value", value);
    
    navigate(`all-sporting-goods?category=${value}`)
  }
  
  return (
    <Card className="bg-white-800  bg-white   text-black rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <p >
        <CardHeader className=" h-[200px] mx-auto">
          <img
            src={item.image}
            className=" overflow-hidden rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt="image"
          />
        </CardHeader>
        <CardContent onClick={()=>navigateToProduct(item.category)} className="grid pe-5">
          <p className="text-center cursor-pointer hover:underline text-xl font-normal">{item.category}</p>
        </CardContent>
      </p>
    </Card>
  );
};

export default CategoryCard;