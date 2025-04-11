import Hero from "@/component/ui/Hero";
import Review from "@/component/ui/Review";
import FeaturedProducts from "./FeaturedProducts";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Review />
    </div>
  );
};

export default Home;
