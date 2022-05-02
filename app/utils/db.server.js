import { PrismaClient } from "@prisma/client";

function getNewPrismaClient() {
  return new PrismaClient();
}

let db;

if (process.env.NODE_ENV === "production") {
  db = getNewPrismaClient();
} else {
  if (!global.__db) {
    global.__db = getNewPrismaClient();
  }
  db = global.__db;
}

export { db };
