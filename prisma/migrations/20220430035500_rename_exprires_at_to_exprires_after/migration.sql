/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Batch` table. All the data in the column will be lost.
  - Added the required column `expiresAfter` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "expiresAt",
ADD COLUMN     "expiresAfter" TIMESTAMP(3) NOT NULL;
