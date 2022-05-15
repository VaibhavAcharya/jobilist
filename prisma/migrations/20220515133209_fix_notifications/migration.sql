/*
  Warnings:

  - You are about to drop the `Notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Notifications";

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_email_query_key" ON "Notification"("email", "query");
