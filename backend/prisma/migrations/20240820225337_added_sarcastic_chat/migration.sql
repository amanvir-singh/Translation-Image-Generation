-- CreateTable
CREATE TABLE "sarcasticChat" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sarcasticChat_pkey" PRIMARY KEY ("id")
);
