// import { PaymentResponse, SearchParams } from "@/types/PaymentType";
// import CheckIcon from "@/public/svgs/order_complete_check.svg";
// import Image from "next/image";
// import { useSetRecoilState } from "recoil";

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: Promise<SearchParams>;
// }) {
//   const setSelectedProductIndex = useSetRecoilState(selectedProductIndexState);

//   const { orderId, paymentKey, amount: amountStr } = await searchParams;

//   const amount = Number(amountStr);

//   // 디버깅: searchParams에 포함된 값 확인
//   console.log("SearchParams:", { orderId, paymentKey, amount });

//   // 디버깅용 UI
//   if (!orderId || !paymentKey || !amount) {
//     return (
//       <div>
//         <h1>SearchParams가 누락되었습니다.</h1>
//         <pre>{JSON.stringify(await searchParams, null, 2)}</pre>
//       </div>
//     );
//   }

//   if (!orderId || !paymentKey || !amount) {
//     return <div>잘못된 요청입니다.</div>;
//   }

//   // 디버깅용
//   console.log("백엔드로 전달될 데이터:", { orderId, paymentKey, amount });

//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // 환경 변수에서 URL 가져오기
//   const response = await fetch(`${backendUrl}/payments/confirm`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ orderId, paymentKey, amount }),
//   });

//   if (!response.ok) {
//     return <div>결제 검증에 실패했습니다.</div>;
//   }

//   console.log("POST 직후:", response);

//   const paymentsResponse: PaymentResponse = await response.json();
//   console.log("전체 결제 응답 데이터:", paymentsResponse);

//   // `result` 객체 추출 및 디버깅
//   const payments = paymentsResponse.result;
//   console.log("결제 결과 데이터 (result):", payments);

//   // // `card` 정보 추출 및 디버깅
//   // const { card } = payments;
//   // console.log("카드 정보:", card);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* 상단 영역 */}
//       <div className="bg-white shadow-md rounded-lg p-4 mb-6">
//         <div className="flex items-center space-x-4">
//           {/* 체크 아이콘 */}
//           <CheckIcon className="w-10 h-10 text-green-500" />
//           <h1 className="text-lg font-bold text-gray-800">
//             주문이 완료되었습니다
//           </h1>
//         </div>
//         <p className="text-sm text-gray-600 mt-2">
//           {" "}
//           주문하신
//           {payments.approvedAt.split("T")[0]} 상품의 주문번호는{" "}
//           <span className="text-red-500 font-semibold">{payments.orderId}</span>{" "}
//           입니다.
//         </p>
//       </div>

//       {/* 주문 상세 정보 */}
//       <div className="bg-white shadow-md rounded-lg p-4">
//         {/* 상품 정보 */}
//         <div className="flex items-start space-x-4 mb-4">
//           {/* 제품 이미지 */}
//           <Image
//             src="/images/chicken.jpg" // 실제 이미지 경로로 교체
//             alt="chicken"
//             width={80}
//             height={80}
//             className="rounded-md"
//           />
//           {/* 제품 상세 정보 */}
//           <div>
//             <p className="text-sm font-bold text-gray-800">
//               {payments.orderName}
//             </p>
//             <p className="text-xs text-gray-600">{payments.orderName}</p>
//           </div>
//         </div>

//         {/* 결제 정보 */}
//         <div className="border-t border-gray-200 pt-4">
//           <div className="flex justify-between text-sm text-gray-600 mb-2">
//             <span>주문금액</span>
//             <span>{payments.totalAmount.toLocaleString()}원</span>
//           </div>

//           <div className="flex justify-between text-sm text-gray-600 mb-2">
//             <span>쿠폰할인</span>
//             <span>-0원</span>
//           </div>

//           <div className="flex justify-between text-sm text-gray-600 mb-2">
//             <span>포인트사용</span>
//             <span>-0P</span>
//           </div>

//           <div className="flex justify-between text-sm font-bold text-gray-800">
//             <span>결제금액</span>
//             <span>{payments.totalAmount.toLocaleString()}원</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { PaymentResponse, SearchParams } from "@/types/PaymentType";
import CheckIcon from "@/public/svgs/order_complete_check.svg";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { selectedProductIndexState } from "@/states/atoms/ProductAtom"; // Recoil 상태 임포트

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const setSelectedProductIndex = useSetRecoilState(selectedProductIndexState);

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

  // `result` 객체 추출 및 디버깅
  const payments = paymentsResponse.result;
  console.log("결제 결과 데이터 (result):", payments);

  // 상품 인덱스를 추출하여 Recoil 상태에 저장
  const productIndex = parseInt(orderId.split("_")[0], 10); // 예시: orderId에서 상품 인덱스 추출
  if (!isNaN(productIndex)) {
    setSelectedProductIndex(productIndex); // Recoil 상태 업데이트
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
          {" "}
          주문하신
          {payments.approvedAt.split("T")[0]} 상품의 주문번호는{" "}
          <span className="text-red-500 font-semibold">{payments.orderId}</span>{" "}
          입니다.
        </p>
      </div>

      {/* 주문 상세 정보 */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* 상품 정보 */}
        <div className="flex items-start space-x-4 mb-4">
          {/* 제품 이미지 */}
          <Image
            src="/images/chicken.jpg" // 실제 이미지 경로로 교체
            alt="chicken"
            width={80}
            height={80}
            className="rounded-md"
          />
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
    </div>
  );
}
