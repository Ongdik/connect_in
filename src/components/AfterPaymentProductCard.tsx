"use client";
import { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types/ProductType";
import { TossError } from "@/types/TossErrorType";
import { loadTossPayments } from "@tosspayments/payment-sdk";
type ProductCardProps = {
    product: ProductType;
    setBalance: React.Dispatch<React.SetStateAction<number>>; 
};
const AfterPaymentProductCard: React.FC<ProductCardProps> = ({ product, setBalance  }) => {
    const isBhcChicken = product.id === 1; // BHC 치킨 여부
    const [participants, setParticipants] = useState(isBhcChicken ? 4 : 1); // BHC 치킨이면 참여 인원 하드코딩
    const maxParticipants = 4; // 최대 참여 인원
    
    const handleProductReceive = () => {
        setBalance((prevBalance) => prevBalance + 135000);
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
        const orderId = `${product.id}_${Date.now()}`;
        try {
            await tossPayments.requestPayment("카드", {
                amount: amountToPay,
                orderId,
                orderName: product.title,
                successUrl: `${window.location.origin}/payments/complete`,
                failUrl: `${window.location.origin}/payments/fail`,
            });
        } catch (error) {
            const tossError = error as TossError;
            if (tossError.code === "USER_CANCEL") {
                // 유저 취소 에러 처리
            } else {
                console.error("Payment error:", tossError);
            }
        }
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
                <div className="mt-2 font-bold text-gray-600 whitespace-nowrap">
                    {product.price}원
                </div>
            </div>
            <div className="mt-2">
                <p>
                    참여 인원: {isBhcChicken ? `${maxParticipants}/${maxParticipants}` : `${participants} / ${maxParticipants}`}
                </p>
                {!isBhcChicken && (
                    <button
                        onClick={handleJoin}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                        disabled={participants >= maxParticipants}
                    >
                        참여하기
                    </button>
                )}
            </div>
            <div className="mt-4">
                {isBhcChicken ? (
                    <button
                        onClick={handleProductReceive}
                        className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        상품 수령
                    </button>
                ) : (
                    <button
                        onClick={participants === maxParticipants ? handlePayment : undefined}
                        className={`mt-2 w-full ${participants < maxParticipants ? "bg-gray-400" : "bg-blue-500"} text-white px-4 py-2 rounded-lg`}
                        disabled={participants < maxParticipants}
                    >
                        {participants < maxParticipants ? "모집 중..." : "결제하기"}
                    </button>
                )}
            </div>
        </div>
    );
};
export default AfterPaymentProductCard;