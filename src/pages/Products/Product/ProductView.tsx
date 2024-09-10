import { useGetSingleProductQuery } from '@/redux/features/products/productApi';
import { DessertIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { number } from 'zod';

const ProductView = () => {
  const { id } = useParams(); 
  const { data, error } = useGetSingleProductQuery( id ); 
  console.log(data);
  
  // const { name,description,category,brand,stockQuantity,rating,productDescription,price,image,isAvailable } = data?.data; 
  console.log("productDetails", data);
  
  
  const [selectedColor, setSelectedColor] = useState('green'); // Default color
  const [selectedSize, setSelectedSize] = useState('S'); // Default size
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#FBBF24' },
    { name: 'Red', value: '#F43F5E' },
    { name: 'Blue', value: '#2563EB' },
  ];

  const sizes = ['56 cm (S)', '67 cm (M)', '77 cm (L)'];

  const handleColorClick = (color: string) => setSelectedColor(color);
  const handleSizeClick = (size: string) => setSelectedSize(size);
  const handleQuantityChange = (e) => setQuantity(Math.max(1, e.target.value));

//   {
//     "_id": "66debef4cbbea440ce4cb67e",
//     "name": "Basketball",
//     "description": "Indoor/outdoor basketball with a composite leather cover",
//     "category": "Sports",
//     "brand": "Spalding",
//     "stockQuantity": 200,
//     "rating": 4.8,
//     "productDescription": "Great grip and bounce, designed for both indoor and outdoor courts.",
//     "price": 30,
//     "image": "https://example.com/images/basketball.jpg",
//     "isAvailable": true,
//     "createdAt": "2024-09-09T09:25:08.549Z",
//     "updatedAt": "2024-09-09T09:25:08.549Z",
//     "__v": 0
// }

  return (
    <section className="py-10 lg:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Product Image */}
          <div className="relative">
            <div className="md:col-span-3 text-center">
              <div className="lg:h-[450px] p-4 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                <img
                  src="https://readymadeui.com/images/sunglass7.webp"
                  alt="Product"
                  className="lg:w-11/12 w-full h-full rounded object-contain object-top"
                />
              </div>

              <div className="flex flex-wrap gap-4 mx-auto mt-4">
                <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                  <img
                    src="https://readymadeui.com/images/sunglass1.webp"
                    alt="Product2"
                    className="w-20 h-16 object-contain"
                  />
                </div>
                <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                  <img
                    src="https://readymadeui.com/images/sunglass2.webp"
                    alt="Product3"
                    className="w-20 h-16 object-contain"
                  />
                </div>
                <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                  <img
                    src="https://readymadeui.com/images/sunglass3.webp"
                    alt="Product4"
                    className="w-20 h-16 object-contain"
                  />
                </div>
                <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                  <img
                    src="https://readymadeui.com/images/sunglass5.webp"
                    alt="Product5"
                    className="w-20 h-16 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="pro-detail w-full flex flex-col justify-around order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto">
            <p className="font-medium text-lg text-indigo-600 mb-4">{data?.data?.category} / {data?.data?.brand}</p>
            <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">{data?.data?.name}</h2>

            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
              <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">${data?.data?.price}</h6>
              <div className="flex items-center gap-2">
                {/* Rating Stars */}
                {[...Array((5))].map((_, index) => (
                  <svg
                    key={index}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill={index < 4 ? "#FBBF24" : "#F3F4F6"} // 4 stars filled, 1 empty
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="10" />
                  </svg>
                ))}
                <span className="pl-2 font-normal leading-7 text-gray-500 text-sm">1624 reviews</span>
              </div>
            </div>

            <p className="text-gray-500 text-base font-normal mb-8">
              { data?.data?.description }
            </p>

            {/* Color Options */}
            <div className="block w-full">
              {/* <p className="font-medium text-lg leading-8 text-gray-900 mb-4">Bag Color</p>
              <div className="flex items-center justify-start gap-3 md:gap-6 relative mb-6">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`p-2.5 border border-gray-200 rounded-full transition-all duration-300 ${
                      selectedColor === color.name.toLowerCase() ? 'border-emerald-500' : 'hover:border-emerald-500'
                    }`}
                    onClick={() => handleColorClick(color.name.toLowerCase())}
                  >
                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="20" fill={color.value} />
                    </svg>
                  </button>
                ))}
              </div>

            
              <p className="font-medium text-lg leading-8 text-gray-900 mb-4">Bag Size</p>
              <div className="grid grid-cols-2 min-[400px]:grid-cols-3 gap-3">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`border border-gray-200 text-gray-900 text-lg py-2 rounded-full px-1.5 sm:px-6 w-full font-semibold shadow-sm transition-all duration-300 ${
                      selectedSize === size ? 'shadow-gray-300 bg-gray-50 border-gray-300' : 'hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center justify-center w-full">
                <button
                  className="group py-4 px-6 border border-gray-400 rounded-l-full shadow-sm transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <svg
                    className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.5 11H5.5" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="font-semibold text-gray-900 text-lg py-[13px] px-6 w-full lg:max-w-[118px] border-y border-gray-400 bg-transparent text-center"
                  min="1"
                />
                <button
                  className="group py-4 px-6 border border-gray-400 rounded-r-full shadow-sm transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <svg
                    className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 5.5V16.5" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M16.5 11H5.5" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <button className="w-full bg-indigo-600 text-white py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:bg-indigo-700">
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductView;
