import { PaymentResponse, SearchParams } from "@/types/PaymentType";

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

  // `result` 객체 추출 및 디버깅
  const payments = paymentsResponse.result;
  console.log("결제 결과 데이터 (result):", payments);

  // // `card` 정보 추출 및 디버깅
  // const { card } = payments;
  // console.log("카드 정보:", card);

  return (
    <div>
      <h1>결제가 완료되었습니다</h1>
      <ul>
        <li>결제 상품: {payments.orderName}</li>
        <li>주문번호: {payments.orderId}</li>
        <li>결제금액: {payments.totalAmount || ""}</li>
        {/* <li>카드회사: {card?.company || "-"}</li>
        <li>카드번호: {card?.number || ""}</li>
        <li>결제금액: {card?.amount || ""}</li> */}
        <li>
          결제승인날짜:{" "}
          {Intl.DateTimeFormat().format(new Date(payments.approvedAt))}
        </li>
      </ul>
    </div>
  );
}
