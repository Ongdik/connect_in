import type { NextApiRequest, NextApiResponse } from "next";
import { PaymentRequest } from "@/types/PaymentType";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { orderId, paymentKey, amount } = req.body as PaymentRequest;
  const secretKey = process.env.TOSS_SECRET_KEY || "";

  if (!orderId || !paymentKey || !amount) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const url = "https://api.tosspayments.com/v1/payments/confirm";
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const response = await fetch(url, {
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
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    res.status(response.status).json(errorResponse);
    return;
  }

  res.redirect(`/payments/complete?orderId=${orderId}`);
}
