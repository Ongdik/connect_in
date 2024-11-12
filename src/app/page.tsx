"use client";

import LocationSelector from "@/components/LocationSelector";
import SearchBar from "@/components/SearchBar";
import PopularCategories from "@/components/PopularCategories";
import ProductList from "@/components/ProductList";
import { loadTossPayments } from "@tosspayments/payment-sdk";

export default function Page() {
  const handleClick = async () => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

    if (!clientKey) {
      console.error("Client key is missing");
      return;
    }

    const tossPayments = await loadTossPayments(clientKey);

    await tossPayments.requestPayment("카드", {
      amount: 5000,
      orderId: Math.random().toString(36).slice(2),
      orderName: "치킨",
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <LocationSelector />
      <SearchBar />
      <PopularCategories />
      <ProductList />
      <button onClick={handleClick}>치킨 5000원</button>
    </div>
  );
}
