import { registerAs } from "@nestjs/config";

export const iopayConfig = registerAs("iopay", () => {
  const isProd = process.env.NODE_ENV === "prod";

  return {
    baseUrl: isProd
      ? process.env.TAP_IOPAY_PAYMENT_URL
      : process.env.SANDBOX_PAYMENT_URL,
    email: isProd
      ? process.env.TAP_IOPAY_PAYMENT_EMAIL?.trim()
      : process.env.SANDBOX_PAYMENT_EMAIL?.trim(),
    secret: isProd
      ? process.env.TAP_IOPAY_PAYMENT_SECRET?.trim()
      : process.env.SANDBOX_PAYMENT_SECRET?.trim(),
    sellerId: isProd
      ? process.env.TAP_IOPAY_PAYMENT_IO_SELLER_ID?.trim()
      : process.env.SANDBOX_PAYMENT_IO_SELLER_ID?.trim(),
  };
});
