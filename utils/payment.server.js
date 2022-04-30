import { db } from "./db.server";

const stripe = require("stripe")(env("STRIPE_TEST_KEY"));

export async function createPaymentUrl(
  postId = null,
  postColor = false,
  expirePrice = null
) {
  if (!postId) return null;

  const YOUR_DOMAIN = env("YOUR_DOMAIN");
  const session = await stripe.checkout.sessions.create({
    line_items: [
      ...(postColor
        ? [
            {
              price: "price_1Kt2sQSDrDyjk9Lfk1wGjYDL",
              quantity: 1,
            },
          ]
        : []),
      ...(expirePrice
        ? [
            {
              price: expirePrice,
              quantity: 1,
            },
          ]
        : []),
    ],
    metadata: { postId: `${postId}` },
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/post?transactionId={CHECKOUT_SESSION_ID}&success=true`,
    cancel_url: `${YOUR_DOMAIN}/post?transactionId={CHECKOUT_SESSION_ID}&success=false`,
  });

  return session?.url;
}

export async function paymentStatus(id) {
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    return { status: session?.payment_status, data: session?.metadata };
  } catch {
    return null;
  }
}

export async function checkTransaction(id) {
  const transaction = await db.TransactionId.findFirst({
    where: { id },
  });

  return transaction;
}

export async function addTransaction(id) {
  const transaction = await db.TransactionId.create({
    data: { id },
  });

  if (transaction) {
    return { error: null, data: "added" };
  }
}
