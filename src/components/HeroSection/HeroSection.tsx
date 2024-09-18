import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import sliderImage1 from "@/assets/images/shos-1.jpg";
import sliderImage2 from "@/assets/images/sports-bags.jpg"
import sliderImage3 from "@/assets/images/viking-1.png";

export function HeroSection() {
  const sliderData = [
    {
      id: 1,
      image: sliderImage1,
    },
    {
      id: 2,
      image: sliderImage2,
    },
    {
      id: 3,
      image: sliderImage3,
    },
  ];

  return (
    <div className="relative w-full h-[300px] mt-0">
      <Carousel
        className=" overflow-hidden rounded-lg shadow-lg"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="bg-transparent border-none flex justify-center items-center max-w-7xl px-4 mx-auto container ">
                <div>
                  <h1 className="text-5xl lg:me-5 sm:me-2 md:me-2 text-red-400 font-bold">25% OFF</h1>
                </div>
                <CardContent className="flex items-center justify-center h-[300px] p-0">
                  <img
                    src={slider?.image}
                    className="h-full object-cover transition-transform duration-500 hover:scale-105"
                    alt=""
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute  left-4 top-1/2 transform -translate-y-1/2 text-lime-500 bg-opacity-25 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
}
