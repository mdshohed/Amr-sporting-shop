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
import PaginationComponent from "../shared/Pagination";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { Button } from "@/components/ui/button";
import FilterBox from "@/components/FilterBox/FilterBox";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";

const Products = () => {
  const [selectedValue, setSelectedValue] = useState('default'); 
  const [priceFilter, setPriceFilter] = useState({minPrice: 0, maxPrice: 0});
  const [ratingFilter, setRatingFilter] = useState({min: 0, max: 5}); 
  const [currentCategory, setCurrentCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])
  const [currentBrand, setCurrentBrand] = useState([])
  const [selectedBrand, setSelectedBrand] = useState([])

  const [products, setProducts] = useState<TProduct[]>([]);
  const { data, error } = useGetAllProductsQuery(undefined, { pollingInterval: 30000 });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  

  
  useEffect(() => {
    if (data && data.data) {
      setProducts(data.data);

      // max price find
      let mxPrice = data.data.reduce((max: number, item: any) => item.price > max ? item.price : max, 0);
      setPriceFilter({ ...priceFilter, maxPrice: mxPrice });
      
      // current Category
      const categoryList = data.data.reduce((acc, item) => {
        if (!acc.includes(item.category)) {acc.push(item.category);}
        return acc; 
      }, []);   
      setCurrentCategory(categoryList)

      // current Brand
      const brandList = data.data.reduce((acc, item) => {
        if (!acc.includes(item.brand)) {
          acc.push(item.brand);
        }
        return acc; 
      }, []);   
      setCurrentBrand(brandList)
    }
  }, [data]);


  const handleSelectChange = (value ='default') => {
    setSelectedValue(value)
  };

  const handleSetFilter = () =>{
    if (data && data.data) {
      let filterProducts: TProduct[] = [...data.data]; 
      // Price filter
      const priceFilterProducts = filterProducts.filter( (item)=>( item.price>= priceFilter.minPrice && item.price<=priceFilter.maxPrice));
      // Rating filter
      const ratingFilterProducts = priceFilterProducts.filter( (item)=>( item.rating>= ratingFilter.min && item.rating<=ratingFilter.max));

      const filtered = ratingFilterProducts.filter((product) => {
        const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(product.category);
        const brandMatch = selectedBrand.length === 0 || selectedBrand.includes(product.brand);
        return categoryMatch && brandMatch;
      });

      // Sort by Price
      if (selectedValue === "low") {
        filtered.sort((a, b) => a.price - b.price); 
      } else if (selectedValue === "high") {
        filtered.sort((a, b) => b.price - a.price); 
      }
      setProducts(filtered)
    }
  }

  useEffect(()=>{
    handleSetFilter();
  }, [selectedValue])

  useEffect(() => {
    if( data&&data.data){
      let filterProducts: TProduct[] = [...data.data]; 
      const filtered = filterProducts.filter((product) => {
        const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(product.category);
        const brandMatch = selectedBrand.length === 0 || selectedBrand.includes(product.brand);
        return categoryMatch && brandMatch;
      });
      setProducts(filtered);
    }
  }, [selectedCategory, selectedBrand]);

  const handleClearFilter = () =>{
    console.log("data clear");
    
    let filterProducts: TProduct[] = [...data.data]; 
    setSelectedBrand([])
    setSelectedCategory([]);
    setRatingFilter({...ratingFilter, min:0, max:5});
    let mxPrice = data.data.reduce((max: number, item: any) => item.price > max ? item.price : max, 0);
    setPriceFilter({ ...priceFilter, maxPrice: mxPrice });
    setSelectedValue('default');
    setProducts(filterProducts)
  }

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
            <Select value={selectedValue} onValueChange={handleSelectChange}>
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
              <FilterBox 
                priceFilter={priceFilter} 
                setPriceFilter={setPriceFilter} 
                ratingFilter={ratingFilter} 
                setRatingFilter={setRatingFilter}
                handleSetFilter={handleSetFilter}
                handleClearFilter={handleClearFilter}
                selectedValue={selectedValue}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                currentBrand={currentBrand}
                setCurrentBrand={setCurrentBrand}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
              ></FilterBox>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {products?.map((item: TProduct) => (
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
