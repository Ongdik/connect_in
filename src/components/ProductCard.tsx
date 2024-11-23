"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types/ProductType";
import { TossError } from "@/types/TossErrorType";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { selectedProductIndexAtom } from "@/states/atoms/ProductAtom";
import { useAtom } from "jotai";

type ProductCardProps = {
  product: ProductType;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, setBalance }) => {
  const [participants, setParticipants] = useState(1); // 현재 참여 인원
  const maxParticipants = 4; // 최대 참여 인원
  const [selectedProductIndex, setSelectedProductIndex] = useAtom(
    selectedProductIndexAtom
  );
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Jotai 상태 변경 감지
  useEffect(() => {
    console.log("Jotai 상태 변경됨: ", selectedProductIndex);
  }, [selectedProductIndex]);

  const handleComplete = () => {
    const isConfirmed = window.confirm("상품을 수령하셨습니까? 확인을 누르면 수령 완료로 처리됩니다.");
    if (isConfirmed) {
      setIsButtonClicked(true);
      setIsCompleted(true);
      setBalance((prevBalance) => prevBalance + ((product.price) / 4) * 3);
      alert("상품 수령이 확인되었습니다.");
      //setSelectedProductIndex(-1); // Jotai 상태 초기화 
    }
  };

  const handleJoin = () => {
    if (participants < maxParticipants) {
      setParticipants((prev) => prev + 1);
    }
  };

  const handlePayment = async () => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

    if (!clientKey) {
      console.error("Client key is missing");
      return;
    }

    const tossPayments = await loadTossPayments(clientKey);
    const amountToPay = product.price / maxParticipants; // 나누어진 금액
    const orderId = `${product.idx}_${Date.now()}`;

    try {
      setSelectedProductIndex(product.idx); // Jotai 상태 업데이트
      console.log("결제를 위해 설정된 idx:", product.idx); // 업데이트된 값을 바로 출력

      await tossPayments.requestPayment("카드", {
        amount: amountToPay,
        orderId,
        orderName: product.title,
        successUrl: `${window.location.origin}/payments/complete`,
        failUrl: `${window.location.origin}/payments/fail`,
      });
    } catch (error) {
      // 에러를 토스 에러로 선언
      const tossError = error as TossError;

      if (tossError.code === "USER_CANCEL") {
      } else {
        console.error("Payment error:", tossError);
      }
    }
  };

  const isPaymentCompleted = selectedProductIndex === product.idx;

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition ${isCompleted ? "opacity-50 pointer-events-none" : ""
        }`}
    >

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
        <div className="mt-2 font-bold text-gray-600 whitespace-nowrap">
          {product.price}원
        </div>
      </div>

      {!isPaymentCompleted && (
        <div className="mt-2">
          <p>
            참여 인원: {participants} / {maxParticipants}
          </p>
          <button
            onClick={handleJoin}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg"
            disabled={participants >= maxParticipants}
          >
            참여하기
          </button>
        </div>
      )}

      <div className="mt-4">
        {isPaymentCompleted ? (
          <button
            onClick={handleComplete}
            className={`mt-2 w-full text-white px-4 py-2 rounded-lg ${isButtonClicked ? "bg-gray-400" : "bg-blue-500"
              }`}
          >
            상품 수령
          </button>
        ) : (
          <button
            onClick={participants === maxParticipants ? handlePayment : undefined}
            className={`mt-2 w-full ${participants < maxParticipants ? "bg-gray-400" : "bg-blue-500"
              } text-white px-4 py-2 rounded-lg`}
            disabled={participants < maxParticipants}
          >
            {participants < maxParticipants ? "모집 중..." : "결제하기"}
          </button>
        )}
      </div>
      {isCompleted && (
        <div className="text-red-600 text-sm mt-2">
          거래 완료된 상품입니다
        </div>
      )}
    </div>
  );
};

export default ProductCard;