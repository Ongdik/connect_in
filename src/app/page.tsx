import LocationSelector from "@/components/LocationSelector";
import SearchBar from "@/components/SearchBar";
import PopularCategories from "@/components/PopularCategories";
import ProductList from "@/components/ProductList";

const HomePage = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <LocationSelector />
      <SearchBar />
      <PopularCategories />
      <ProductList />
    </div>
  );
};

export default HomePage;
