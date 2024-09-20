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
import { useNavigate, useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState<string>('default'); 
  const [priceFilter, setPriceFilter] = useState<{minPrice: number, maxPrice: number}>({minPrice: 0, maxPrice: 0});
  const [ratingFilter, setRatingFilter] = useState<{min: number, max: number}>({min: 0, max: 5}); 
  const [currentCategory, setCurrentCategory] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [currentBrand, setCurrentBrand] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string[]>([])
  // const [ searchValue, setSearchValue] = useState('');

  const [products, setProducts] = useState<TProduct[]>([]);
  const { data } = useGetAllProductsQuery(undefined, { pollingInterval: 30000 });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  
  useEffect(()=>{
    if(category){
      setSelectedCategory([...selectedCategory, category])
    }
    else{
      setSelectedCategory([])
    }
  },[category]);
  
  useEffect(() => {
    if (data && data.data) {
      setProducts(data.data);

      // max price find
      let mxPrice = data.data.reduce((max: number, item: any) => item.price > max ? item.price : max, 0);
      setPriceFilter({ ...priceFilter, maxPrice: mxPrice });
      
      // current Category
      const categoryList = data.data.reduce((acc: any, item: TProduct) => {
        if (!acc.includes(item.category)) {acc.push(item.category);}
        return acc; 
      }, []);   
      setCurrentCategory(categoryList)

      // current Brand
      const brandList = data.data.reduce((acc: any, item: TProduct) => {
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

      const priceFilterProducts = filterProducts.filter( (item: TProduct)=>( (item?.price ? item.price: 0)>= priceFilter.minPrice && (item?.price ? item.price: 0)<=priceFilter.maxPrice));
      // Rating filter
      const ratingFilterProducts = priceFilterProducts.filter( (item)=>( (item?.rating ? item.rating: 0)>= ratingFilter.min && (item?.rating ? item.rating: 0)<=ratingFilter.max));

      const filtered: TProduct[] = ratingFilterProducts.filter((product: TProduct) => {
        const categoryMatch = selectedCategory.length === 0 ||(product?.category && selectedCategory.includes(product?.category));
        const brandMatch = selectedBrand.length === 0 || (product?.brand && selectedBrand.includes(product?.brand));
        return categoryMatch && brandMatch;
      });

      // Sort by Price
      if (selectedValue === "low") {
        filtered.sort((a, b ) => (a.price || 0)- (b.price || 0)); 
      } else if (selectedValue === "high") {
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0)); 
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
        const categoryMatch = selectedCategory.length === 0 || (product.category && selectedCategory.includes(product.category));
        const brandMatch = selectedBrand.length === 0 || (product.brand && selectedBrand.includes(product.brand));
        return categoryMatch && brandMatch;
      });
      setProducts(filtered);
    }
  }, [selectedCategory, selectedBrand]);

  const handleClearFilter = () =>{
    navigate('/all-sporting-goods');
    let filterProducts: TProduct[] = [...data.data]; 
    setSelectedBrand([])
    setSelectedCategory([]);
    setRatingFilter({...ratingFilter, min:0, max:5});
    let mxPrice = data.data.reduce((max: number, item: any) => item.price > max ? item.price : max, 0);
    setPriceFilter({ ...priceFilter, maxPrice: mxPrice });
    setSelectedValue('default');
    setProducts(filterProducts)
    // setSearchValue('')
  }

  const handleSearchProduct = ( e: string) =>{
    // setSearchValue(e)

    // clear search filter
    // navigate('/all-sporting-goods');
    // setSelectedBrand([])
    // setSelectedCategory([]);
    // setRatingFilter({...ratingFilter, min:0, max:5});
    // let mxPrice = data.data.reduce((max: number, item: any) => item.price > max ? item.price : max, 0);
    // setPriceFilter({ ...priceFilter, maxPrice: mxPrice });

    // call serach function
    const newProduct = [...data.data];
    const findProducts = newProduct.filter( (product) => product.name.toLowerCase().includes(e.toLowerCase()));
    if (selectedValue === "low") {
      findProducts.sort((a, b) => a.price - b.price); 
    } else if (selectedValue === "high") {
      findProducts.sort((a, b) => b.price - a.price); 
    }
    setProducts(findProducts);
  }

  return (
    <div className="mx-auto container max-w-7xl px-4 my-[35px]">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center bg-white border py-3 rounded-t-lg px-4">
        {/* <div className=""> */}
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </div>
                <input
                  onChange={(e)=>handleSearchProduct(e.target.value)}
                  type="text"
                  id="simple-search"
                  placeholder="Search for products"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </form>
          </div>
        {/* </div> */}
       
      
        <div className="flex mb-2 md:mb-0 flex-row  justify-center items-center">
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
                // selectedValue={selectedValue}
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
