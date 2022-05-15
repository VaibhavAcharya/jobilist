/*
  Warnings:

  - You are about to drop the column `qurey` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `query` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "qurey",
ADD COLUMN     "query" TEXT NOT NULL;
