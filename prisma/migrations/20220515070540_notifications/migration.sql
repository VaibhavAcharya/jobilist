-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "qurey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);
