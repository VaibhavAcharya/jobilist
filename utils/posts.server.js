import { JOB_EXPIRE_OPTIONS } from "../app/constants.js";
import { db } from "./db.server.js";

export async function addBatch(batch, posts) {
  var expiresAt = new Date();
  const { expiresAfter } = batch;
  expiresAt.setDate(expiresAt.getDate() + expiresAfter);
  batch.expiresAt = expiresAt.toISOString();

  const data = {
    ...{
      ...batch,
      expiresAfter: undefined,
    },
    posts: { create: posts },
  };

  const post = await db.batch.create({ data });

  if (post) {
    return post;
  }

  return null;
}

export async function addEmail(email) {
  const mail = await db.userEmail.create({
    data: { email },
  });

  if (mail) {
    return mail;
  }

  return null;
}
