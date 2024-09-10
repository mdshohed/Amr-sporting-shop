import ProductCard from "@/components/ProductCard/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";

import { TProduct } from "@/types/types";
import SearchField from "../shared/SearchField";
import PaginationComponent from "../shared/Pagination";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { Button } from "@/components/ui/button";
import FilterBox from "@/components/FilterBox/FilterBox";
import { Filter } from "lucide-react";

const Products = () => {
  const { data, error } = useGetAllProductsQuery(undefined);
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
      <div className="flex  items-end justify-end bg-white border py-3 rounded-t-lg px-4">
        {/* <div>
          <SearchField></SearchField>
        </div> */}
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-row justify-center items-center me-5">
            <div>
              <p className="me-2 whitespace-nowrap">Sort Price</p>
            </div>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">{"Default"}</SelectItem>
                <SelectItem value="low">{"low > high"}</SelectItem>
                <SelectItem value="high">{"high > low"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Sheet>
              <SheetTrigger>
                <Button className=" flex flex-row justify-center items-center p-2 bg-gray-50 text-black hover:bg-gray-100">
                  <Filter className="w-4 me-1" />
                  <p>Filter</p>
                </Button>
              </SheetTrigger>
              <FilterBox></FilterBox>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {data?.data?.map((item: TProduct) => (
          <ProductCard item={item}></ProductCard>
        ))}
      </div>

      {/* pagination */}
      <div>
        <PaginationComponent></PaginationComponent>
      </div>
    </div>
  );
};

export default Products;
