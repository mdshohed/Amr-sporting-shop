import { ContactUs } from "@/components/ContactUs/ContactUs";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import LatestProducts from "@/components/LatestProducts/LatestProducts";

const Home = () => {
  return (
    <div className="mx-auto container">
      <HeroSection></HeroSection>
      <LatestProducts></LatestProducts>
      <ContactUs></ContactUs>
      {/* <HeroSection />
      <TopMovies /> */}
    </div>
  );
}
export default Home;
