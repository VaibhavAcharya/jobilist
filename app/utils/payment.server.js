import Razorpay from "razorpay";

import { getPostPriceFromCurrencyValue } from "../helpers/misc";

export async function createOrder(count, currency) {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const orderOptions = {
    amount: parseFloat(count) * getPostPriceFromCurrencyValue(currency),
    currency,
  };

  const order = await instance.orders.create(orderOptions);

  return order;
}
