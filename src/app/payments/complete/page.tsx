import { PaymentResponse, SearchParams } from "@/types/PaymentType";
import CheckIcon from "@/public/svgs/order_complete_check.svg";
import PaidProduct from "@/components/PaidProduct";
import HomeButton from "@/components/HomeButton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { orderId, paymentKey, amount: amountStr } = await searchParams;
  const amount = Number(amountStr);

  // 디버깅: searchParams에 포함된 값 확인
  console.log("SearchParams:", { orderId, paymentKey, amount });

  // 디버깅용 UI
  if (!orderId || !paymentKey || !amount) {
    return (
      <div>
        <h1>SearchParams가 누락되었습니다.</h1>
        <pre>{JSON.stringify(await searchParams, null, 2)}</pre>
      </div>
    );
  }

  if (!orderId || !paymentKey || !amount) {
    return <div>잘못된 요청입니다.</div>;
  }

  // 디버깅용
  console.log("백엔드로 전달될 데이터:", { orderId, paymentKey, amount });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // 환경 변수에서 URL 가져오기
  const response = await fetch(`${backendUrl}/payments/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, paymentKey, amount }),
  });

  if (!response.ok) {
    return <div>결제 검증에 실패했습니다.</div>;
  }

  console.log("POST 직후:", response);

  const paymentsResponse: PaymentResponse = await response.json();
  console.log("전체 결제 응답 데이터:", paymentsResponse);

  const payments = paymentsResponse.result;
  console.log("결제 결과 데이터 (result):", payments);

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      {/* 상단 영역 */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* 체크 아이콘 */}
          <CheckIcon className="w-10 h-10 text-green-500" />
          <h1 className="text-lg font-bold text-gray-800">
            주문이 완료되었습니다
          </h1>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {payments.approvedAt.split("T")[0]} 주문하신 상품의 주문번호는{" "}
          <span className="text-red-500 font-semibold">{payments.orderId}</span>{" "}
          입니다.
        </p>
      </div>

      {/* 주문 상세 정보 */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* 상품 정보 */}
        <div className="flex items-start space-x-4 mb-4">
          {/* SelectedIndex 컴포넌트를 통해 이미지와 상품 정보를 표시 */}
          <PaidProduct />

          {/* 제품 상세 정보 */}
          <div>
            <p className="text-sm font-bold text-gray-800">
              {payments.orderName}
            </p>
            <p className="text-xs text-gray-600">{payments.orderName}</p>
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>주문금액</span>
            <span>{payments.totalAmount.toLocaleString()}원</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>쿠폰할인</span>
            <span>-0원</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>포인트사용</span>
            <span>-0P</span>
          </div>

          <div className="flex justify-between text-sm font-bold text-gray-800">
            <span>결제금액</span>
            <span>{payments.totalAmount.toLocaleString()}원</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <HomeButton />
      </div>
    </div>
  );
}
