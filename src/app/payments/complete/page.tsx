import { PaymentResponse, SearchParams } from "@/types/PaymentType";

// SearchParams 인터페이스를 사용하여 searchParams를 직접 받음
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { orderId } = await searchParams;

  const secretKey = process.env.TOSS_SECRET_KEY || "";
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // 환경 변수에서 URL 가져오기
  const url = `${backendUrl}/api/payments/${orderId}`; // 백엔드 API 호출

  const payments: PaymentResponse = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  const { card } = payments;
  return (
    <div>
      <h1>결제가 완료되었습니다</h1>
      <ul>
        <li>결제 상품: {payments.orderName}</li>
        <li>주문번호: {payments.orderId}</li>
        <li>카드회사: {card?.company || "-"}</li>
        <li>카드번호: {card?.number || ""}</li>
        <li>결제금액: {card?.amount || ""}</li>
        <li>
          결제승인날짜:{" "}
          {Intl.DateTimeFormat().format(new Date(payments.approvedAt))}
        </li>
      </ul>
    </div>
  );
}
