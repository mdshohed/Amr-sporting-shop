import ProductCard from "@/components/ProductCard/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { TProduct } from "@/types/types";
import SearchField from "../shared/SearchField";
import { Filter } from "lucide-react";
import PaginationComponent from "../shared/Pagination";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";

const Products = () => {
  const {data, error} = useGetAllProductsQuery(undefined); 
  console.log("AllProduct2", data, error);
  

  // const [data, setData] = useState([]);
  // useEffect(()=>{
  //   fetch('http://localhost:5000/api/products')
  //   .then(res=>res.json())
  //   .then(res=>setData(res.data))
  //   .catch(err=>console.log(err))
  //   .finally()
  // },[])

  return (
    <div className="mx-auto container max-w-7xl px-4 my-[35px]">
      <div className="flex flex-row items-center justify-between bg-white border py-3 rounded-t-lg px-4">
        <div>
          <SearchField></SearchField>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-row justify-center items-center me-5">
            <div>
              <p className="me-2">Sort Price</p> 
            </div>
            <Select>
            
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Low-to-high" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">low-to-high</SelectItem>
                <SelectItem value="high">high-to-low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Filter />
          </div>
        </div>
      </div>
       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {
          data?.data?.map( (item: TProduct)=>(
            <ProductCard item={item}></ProductCard>
          ))
        }
       
      </div>


      {/* pagination */}
      <div>
        <PaginationComponent></PaginationComponent>
      </div>
    </div>
  );
};

export default Products;