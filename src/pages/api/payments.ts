import type { NextApiRequest, NextApiResponse } from "next";
import { PaymentRequest } from "@/types/PaymentType";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId, paymentKey, amount } = req.query as Partial<PaymentRequest>;
  const secretKey = process.env.TOSS_SECRET_KEY || "";

  if (!orderId || !paymentKey || !amount) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const url = "https://api.tosspayments.com/v1/payments/confirm";
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      amount,
      orderId,
      paymentKey,
    }),
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  res.redirect(`/payments/complete?orderId=${orderId}`);
}
