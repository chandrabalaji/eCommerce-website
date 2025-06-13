import LimitedTimeOffers from "@/components/LimitedTimeOffers";
import OffersGridSection from "@/components/OffersGridSection";
import ProductList from "@/components/ProductList";
import ServiceHighlights from "@/components/ServiceHighlights";
import Slider from "@/components/Slider";
import TodayDeals from "@/components/TodayDeals";

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <ServiceHighlights />
      <OffersGridSection />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-lg font-semibold font-josefin">OUR PRODUCTS</h1>
        <ProductList />
      </div>
      <LimitedTimeOffers />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-lg font-semibold font-josefin">Today Deals</h1>
        <TodayDeals />
      </div>
    
    </div>
  );
};

export default HomePage;
