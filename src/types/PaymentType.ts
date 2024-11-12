export interface PaymentRequest {
  orderId: string;
  paymentKey: string;
  amount: number;
}

export interface PaymentResponse {
  orderName: string;
  orderId: string;
  approvedAt: string;
  card: {
    company: string;
    number: string;
    amount: number;
  } | null;
}

export interface SearchParams {
  orderId: string;
}
