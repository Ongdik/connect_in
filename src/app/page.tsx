import LocationSelector from "@/components/LocationSelector";
import SearchBar from "@/components/SearchBar";

const HomePage = () => {
  return (
    <div className="max-w-screen-md mx-auto">
      <LocationSelector />
      <SearchBar />
    </div>
  );
};

export default HomePage;
