import Category from "@/components/Category/Category";
import { ContactUs } from "@/components/ContactUs/ContactUs";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import LatestProducts from "@/components/LatestProducts/LatestProducts";

const Home = () => {
  return (
    <div className="">
      <HeroSection></HeroSection>

      <LatestProducts></LatestProducts>

      <Category></Category>

      <ContactUs></ContactUs>
    </div>
  );
}
export default Home;
