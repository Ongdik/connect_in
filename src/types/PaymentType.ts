export interface PaymentRequest {
  orderId: string;
  paymentKey: string;
  amount: number;
}

export interface PaymentResponse {
  isSuccess: boolean; // 성공 여부
  code: string; // 응답 코드
  message: string; // 응답 메시지
  result: {
    // 결제 상세 정보
    orderName: string;
    orderId: string;
    approvedAt: string;
    amount: number;
    // card: {
    //   company: string;
    //   number: string;
    //   amount: number;
    // } | null;
  };
}

export interface SearchParams {
  orderId: string;
  amount: number;
  paymentKey: string;
}
