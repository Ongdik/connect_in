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
    status: string;
    orderName: string;
    orderId: string;
    totalAmount: number;
    approvedAt: string;
  };
}

export interface SearchParams {
  orderId: string;
  amount: number;
  paymentKey: string;
}
