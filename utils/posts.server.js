import { JOB_EXPIRE_OPTIONS } from "../app/constants.js";
import { db } from "./db.server.js";

export async function addBatch(batch, posts) {
  var expiresAt = new Date();
  const { expiresAfter, color } = batch;
  expiresAt.setDate(expiresAt.getDate() + expiresAfter);
  batch.expiresAt = expiresAt.toISOString();

  if (
    JOB_EXPIRE_OPTIONS.find(function (option) {
      return option.value === expiresAfter;
    })?.price ||
    color !== "default"
  ) {
    batch.isActive = false;
  }

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

export async function activeBatch(id) {
  const batch = await db.batch.update({
    where: {
      id: id,
    },
    data: {
      isActive: true,
    },
  });

  return batch;
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
