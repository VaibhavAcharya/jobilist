-- CreateTable
CREATE TABLE "View" (
    "url" STRING NOT NULL,
    "count" INT4 NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "website" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING,
    "logoURL" STRING,
    "color" STRING,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "type" STRING NOT NULL,
    "location" STRING NOT NULL,
    "salaryStart" DECIMAL(65,30) NOT NULL,
    "salaryEnd" DECIMAL(65,30) NOT NULL,
    "applyLink" STRING,
    "applyEmail" STRING,
    "description" STRING,
    "tags" STRING[],
    "pinExpiresAt" TIMESTAMP(3),
    "batchID" STRING NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Search" (
    "id" STRING NOT NULL,
    "query" STRING NOT NULL,
    "count" INT4 NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "query" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "View_url_key" ON "View"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Search_query_key" ON "Search"("query");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_email_query_key" ON "Notification"("email", "query");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_batchID_fkey" FOREIGN KEY ("batchID") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
