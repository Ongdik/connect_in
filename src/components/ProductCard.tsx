"use client";

import Image from "next/image";
import { ProductType } from "@/types/ProductType";
import { loadTossPayments } from "@tosspayments/payment-sdk";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handlePayment = async () => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

    if (!clientKey) {
      console.error("Client key is missing");
      return;
    }

    const tossPayments = await loadTossPayments(clientKey);

    await tossPayments.requestPayment("카드", {
      amount: product.price,
      orderId: `${product.id}_${Date.now()}`,
      orderName: product.title,
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <Image
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-auto object-cover rounded-lg"
        width={500}
        height={300}
        layout="responsive"
      />
      <div className="flex items-center justify-between">
        <div className="mt-2 font-bold text-gray-800 whitespace-nowrap overflow-hidden truncate">
          {product.title}
        </div>
        <div className="mt-2 text-gray-600 whitespace-nowrap">
          {product.price}원
        </div>
      </div>
      <button
        onClick={handlePayment}
        className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        결제하기
      </button>
    </div>
  );
};

export default ProductCard;
