/*
  Warnings:

  - You are about to drop the column `expiresAfter` on the `Batch` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "expiresAfter",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
