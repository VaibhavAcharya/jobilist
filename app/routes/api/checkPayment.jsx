import crypto from "crypto";
import { addBatch } from "~/utils/posts.server";

export async function action({ request }) {
  try {
    const data = await request.json();
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpaySignature,
      batch,
      posts,
    } = data;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature) {
      return new Response(JSON.stringify({ error: "Transaction not legit!" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    }

    addBatch(batch, posts);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }
}
