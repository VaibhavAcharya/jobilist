import Razorpay from "razorpay";

export async function createOrder(count) {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const orderOptions = {
    amount: parseInt(count) * 100,
    currency: "USD",
  };

  const order = await instance.orders.create(orderOptions);

  return order;
}
