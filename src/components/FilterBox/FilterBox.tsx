import { SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "../ui/button";
// import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterBoxProps {
  priceFilter: {minPrice: number, maxPrice: number};
  setPriceFilter: React.Dispatch<React.SetStateAction<{ minPrice: number; maxPrice: number }>>;
  ratingFilter: {min: number, max: number}; 
  setRatingFilter: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>; 
  handleSetFilter: () => void;
  handleClearFilter: () => void;
  currentCategory: string[]; 
  setCurrentCategory: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  currentBrand: string[]; 
  setCurrentBrand: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrand: string[];
  setSelectedBrand: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterBox: React.FC<FilterBoxProps> = ({
  priceFilter,
  setPriceFilter,
  ratingFilter,
  setRatingFilter,
  handleSetFilter,
  handleClearFilter,
  currentCategory,
  selectedCategory,
  setSelectedCategory,
  currentBrand,
  selectedBrand,
  setSelectedBrand,
}) => {
  const handleSelectCategory = (value: string) => {
    setSelectedCategory((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item: string) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const handleSelectBrand = (value: string) => {    
    setSelectedBrand((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item: string) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  return (
    <SheetContent side={"left"} className="overflow-y-auto">
      <SheetHeader>
        <div >
          <Button onClick={handleClearFilter} className="bg-red-400  hover:bg-red-500" >Clear filter</Button>
        </div>
        <Accordion type="multiple">
          {/* price filter */}
          <AccordionItem
            value="item-1"
            className="rounded-lg bg-gray-50 px-5 my-2"
          >
            <div className="py-4">
              <AccordionTrigger>Filter by price</AccordionTrigger>
              {/* <SheetTitle className="my-2">Filter by price</SheetTitle> */}
              <AccordionContent>
                <div className="">
                  <div className="flex flex-row justify-center items-center">
                    <div>
                      <label>Min Price</label>
                      <input
                        type="number"
                        min={0}
                        value={priceFilter.minPrice }
                        onChange={(e) =>
                          setPriceFilter({
                            ...priceFilter,
                            minPrice: Number(e.target.value),
                          })
                        }
                        className="border w-24 px-2 py-1 rounded"
                        placeholder="Min"
                      />
                    </div>
                    <div>
                      <label>Max Price</label>
                      <input
                        type="number"
                        value={priceFilter.maxPrice }
                        onChange={(e) =>
                          setPriceFilter({
                            ...priceFilter,
                            maxPrice: Number(e.target.value),
                          })
                        }
                        className="border w-24 px-2 py-1 rounded"
                        placeholder="Max"
                      />
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={handleSetFilter}
                        className=" bg-black text-white font-sans px-2 py-1 rounded-md "
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>

          {/* rating filter */}
          <AccordionItem
            value="item-2"
            className="rounded-lg bg-gray-50 px-5 my-2"
          >
            <div className="py-4">
              <AccordionTrigger>Filter by Rating</AccordionTrigger>
              <AccordionContent>
                <div className="">
                  <div className="flex flex-row justify-center items-center">
                    <div>
                      <label>Min Rating</label>
                      <input
                        type="number"
                        min={0}
                        value={ratingFilter.min ?? ""}
                        onChange={(e) =>
                          setRatingFilter({
                            ...ratingFilter,
                            min: Number(e.target.value),
                          })
                        }
                        className="border w-24 px-2 py-1 rounded"
                        placeholder="Min"
                      />
                    </div>
                    <div>
                      <label>Max Rating</label>
                      <input
                        type="number"
                        max={5}
                        value={ratingFilter.max ?? ""}
                        onChange={(e) =>
                          setRatingFilter({
                            ...ratingFilter,
                            max: Number(e.target.value),
                          })
                        }
                        className="border w-24 px-2 py-1 rounded"
                        placeholder="Max"
                      />
                    </div>

                    <div className="mt-5">
                      <button
                        onClick={handleSetFilter}
                        className=" bg-black text-white font-sans px-2 py-1 rounded-md "
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>

          {/* category item */}
          <AccordionItem
            value="item-3"
            className="rounded-lg bg-gray-50 px-5 my-2"
          >
            <div className="py-4">
              <AccordionTrigger>Filter by Category</AccordionTrigger>
              <AccordionContent>
                {currentCategory?.map((item: string) => (
                    <div className="flex items-center space-x-2 mt-3 ms-3">
                      <Checkbox
                       id={item}
                       checked={selectedCategory.includes(item)}
                       onClick={() => handleSelectCategory(item)}
                      />
                      <label
                        htmlFor={item}
                        className="text-md  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item}
                      </label>
                    </div>
                  )
                )}
              </AccordionContent>
            </div>
          </AccordionItem>

          {/* brand item */}
          <AccordionItem
            value="item-4"
            className="rounded-lg bg-gray-50 px-5 my-2"
          >
            <div className="py-4">
              <AccordionTrigger>Filter by Brand</AccordionTrigger>
              <AccordionContent>
                { currentBrand && currentBrand?.map((item: string) => (
                  <div className="flex items-center space-x-2 mt-3 ms-3">
                    <Checkbox
                      id={item}
                      checked={selectedBrand.includes(item)}

                      onClick={() => handleSelectBrand(item)}
                    />
                    <label
                      htmlFor={item}
                      className="text-md  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </SheetHeader>
    </SheetContent>
  );
};

export default FilterBox;
