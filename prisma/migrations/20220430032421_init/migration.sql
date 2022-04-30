-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logoURL" TEXT,
    "color" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salaryStart" DECIMAL(65,30) NOT NULL,
    "salaryEnd" DECIMAL(65,30) NOT NULL,
    "applyLink" TEXT,
    "applyEmail" TEXT,
    "description" TEXT,
    "tags" TEXT[],
    "pinExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "batchID" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionId" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userEmail" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,

    CONSTRAINT "userEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userEmail_email_key" ON "userEmail"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_batchID_fkey" FOREIGN KEY ("batchID") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
