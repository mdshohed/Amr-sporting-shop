

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import sliderImage1 from "@/assets/images/hero1.jpg";
import sliderImage2 from "@/assets/images/hero2.jpg";
import sliderImage3 from "@/assets/images/hero3.jpg";
import sliderImage4 from "@/assets/images/hero4.jpg";
import { Link } from "react-router-dom";

export function HeroSection() {
  const sliderData = [
    {
      id: 1,
      image: sliderImage1,
      title: 'Big Savings on Top Gear', 
      description: 'On selected sports apparel and accessories. Limited time offer!',
      discount:'Up to 50% Off'
    },
    {
      id: 2,
      image: sliderImage2,
      title: 'Play Like a Pro', 
      description: 'On selected sports apparel and accessories. Limited time offer!',
      discount:'Buy 1, Get 1 Free '
    },
    {
      id: 3,
      image: sliderImage3,
      title: 'Conquer Every Challenge', 
      description: 'On orders over $100. Get your gear delivered to your door!',
      discount:'Free Shipping '
    },
    {
      id: 4,
      image: sliderImage4,
      title: 'Train Hard, Play Hard', 
      description: 'Be the first to grab the latest sports equipment and save!',
      discount:'20% Off New Arrivals'
    },
  ];




  return (
    <div className="relative w-full  mt-0">
      <Carousel
        className=" overflow-hidden "
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider, idx) => (
            <CarouselItem key={slider.id} className="">

              <div className="relative h-full w-full">
                <div className="max-h-[500px] flex justify-center items-center">
                  <img
                    src={slider.image}
                    alt={`image ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/25">
                  <div className="w-3/4 text-white text-center md:w-2/4">
                    
                    <p color="white" className="mb-3 font-semibold text-2xl md:text-5xl lg:text-6xl">
                      {slider.discount}
                    </p>
                    <p color="white" className="mb-10 text-sm md:text-lg lg:text-2xl  opacity-80">
                      {slider.description}
                    </p>
                    <p
                      color="white"
                      className="mb-5 text-xl md:text-2xl lg:text-3xl"
                    >
                      {slider.title}
                    </p>
                    
                    <div className="flex justify-center items-center gap-2">
                      <Link to="/all-sporting-goods">
                        <button
                          className="text-lg lg:text-xl font-medium bg-red-600 hover:bg-gray-800 text-white px-3 py-2 rounded-md"
                          color="white"
                        >
                          Stop Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute  left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
}
