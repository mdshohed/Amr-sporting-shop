import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";


const FilterBox = () => {
  const productCategory = [
    { category: "Footwear", key:1},
    { category: "Fitness Equipment", key:1},
    { category: "Sports", key:1},
    { category: "Electronics", key:1},
    { category: "FootBall", key:1}
  ]
  return (
    <SheetContent side={'left'} className="overflow-y-auto">
      <SheetHeader>
        <div>
          <Button className="bg-red-400  hover:bg-red-500">Clear filter</Button>
        </div>
        <div className="py-4">
          <SheetTitle className="my-2">Filter by price</SheetTitle>
          <Slider className="bg-red-500" min={100} defaultValue={[30000]} max={50000} step={1} />
        </div>
        <div className="py-4">
          <SheetTitle className="mb-2">Filter by Rating</SheetTitle>
          <Slider className="bg-red-500" min={1} defaultValue={[3]} max={7} step={1} />
        </div>

        <div className="py-4">
          <SheetTitle className="my-2">Filter by Category</SheetTitle>
          {
            productCategory?.map((item)=>(
              <div className="flex items-center space-x-2 mt-3 ms-3">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-md  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item?.category}
                </label>
              </div>
            ))
          }
        </div>

        <div className="py-4">
          <SheetTitle className="my-2">Filter by Brand</SheetTitle>
          {
            productCategory?.map((item)=>(
              <div className="flex items-center space-x-2 mt-3 ms-3">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-md  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item?.category}
                </label>
              </div>
            ))
          }
        </div>
       
      </SheetHeader>
    </SheetContent>
  );
};

export default FilterBox;