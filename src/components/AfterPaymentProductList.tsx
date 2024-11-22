"use client";
import AfterPaymentProductCard from "./AfterPaymentProductCard";
import { ProductType } from "@/types/ProductType";
import { useState } from "react";
import AccountCard
 from "./AccountCard";
// 더미 데이터
const sampleProducts: ProductType[] = [
  {
    id: 1,
    title: "BHC 치킨",
    imageUrl: "/images/chicken.jpg",
    price: 18000,
  },
  {
    id: 2,
    title: "마라맛 엽떡",
    imageUrl: "/images/tteokbokki.jpg",
    price: 12000,
  },
  {
    id: 3,
    title: "빽보이 피자",
    imageUrl: "/images/pizza.jpg",
    price: 15000,
  },
  {
    id: 4,
    title: "장충동 왕족발",
    imageUrl: "/images/jokbal.jpg",
    price: 20000,
  },
  {
    id: 5,
    title: "김밥 브라더스",
    imageUrl: "/images/kimbap.jpg",
    price: 8000,
  },
];
const ProductList = () => {
  const [balance, setBalance] = useState(0); 
  return (
    <div className="p-4">
       <AccountCard balance={balance} />
      <h2 className="text-xl font-semibold mb-4">추천 상품</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sampleProducts.map((product) => (
          <AfterPaymentProductCard
            key={product.id}
            product={product}
            setBalance={setBalance}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
