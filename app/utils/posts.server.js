import { add, formatISO } from "date-fns";

import { db } from "./db.server.js";

export async function addBatch(batch, posts) {
  try {
    const batchResponse = await db.batch.create({
      data: {
        ...batch,
        expiresAt: formatISO(
          add(new Date(), {
            days: parseInt(batch.expiresAfter),
          })
        ),
        expiresAfter: undefined,
        posts: {
          createMany: {
            data: posts,
          },
        },
      },
    });

    return {
      data: batchResponse,
    };
  } catch (error) {
    console.error("Failed to create batch!", error);

    return {
      error: "Failed to create batch!",
    };
  }
}
