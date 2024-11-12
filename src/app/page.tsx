"use client";

import LocationSelector from "@/components/LocationSelector";
import SearchBar from "@/components/SearchBar";
import PopularCategories from "@/components/PopularCategories";
import ProductList from "@/components/ProductList";
import { loadTossPayments } from "@tosspayments/payment-sdk";

const HomePage = () => {
  const handleClick = async () => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

    if (!clientKey) {
      console.error("Toss client key is not defined");
      return;
    }

    const tossPayments = await loadTossPayments(clientKey);

    await tossPayments.requestPayment("카드", {
      amount: 1,
      orderId: Math.random().toString(36).slice(2),
      orderName: "치킨",
      successUrl: `${window.location.origin}/api/payment`,
      failUrl: `${window.location.origin}/api/payment/fail`,
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <LocationSelector />
      <SearchBar />
      <PopularCategories />
      <ProductList />
      <button onClick={handleClick}>테스트 1원</button>
    </div>
  );
};

export default HomePage;
