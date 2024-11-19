import { PaymentResponse, SearchParams } from "@/types/PaymentType";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { orderId, amount } = await searchParams;

  if (!orderId || !amount) {
    return <div>잘못된 요청입니다.</div>;
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // 환경 변수에서 URL 가져오기
  const response = await fetch(`${backendUrl}/payments/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, amount }),
  });

  if (!response.ok) {
    return <div>결제 검증에 실패했습니다.</div>;
  }

  const paymentsResponse: PaymentResponse = await response.json();

  // `result` 객체 추출 및 디버깅
  const payments = paymentsResponse.result;

  return (
    <div>
      <h1>결제가 완료되었습니다</h1>
      <ul>
        <li>결제 상품: {payments.orderName}</li>
        <li>주문번호: {payments.orderId}</li>
        <li>결제금액: {payments.amount || ""}</li>
        {/* <li>카드회사: {card?.company || "-"}</li>
        <li>카드번호: {card?.number || ""}</li>
        <li>결제금액: {card?.amount || ""}</li> */}
        <li>
          결제승인날짜:{" "}
          {payments.approvedAt
            ? Intl.DateTimeFormat().format(new Date(payments.approvedAt))
            : "날짜 정보 없음"}
        </li>
      </ul>
    </div>
  );
}
