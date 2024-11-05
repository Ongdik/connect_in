import LocationSelector from "@/components/LocationSelector";
import SearchBar from "@/components/SearchBar";
import PopularCategories from "@/components/PopularCategories";

const HomePage = () => {
  return (
    <div className="max-w-screen-md mx-auto">
      <LocationSelector />
      <SearchBar />
      <PopularCategories />
    </div>
  );
};

export default HomePage;
