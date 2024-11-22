"use client";
import LocationSelector from "@/components/LocationSelector";
import SearchBar from "@/components/SearchBar";
import PopularCategories from "@/components/PopularCategories";
import AfterPaymentProductList from "@/components/AfterPaymentProductList";
export default function chicken() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <LocationSelector />
      <SearchBar />
      <PopularCategories />
      <AfterPaymentProductList />
    </div>
  );
}