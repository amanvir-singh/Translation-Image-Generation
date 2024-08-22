-- CreateTable
CREATE TABLE "moodColor" (
    "id" SERIAL NOT NULL,
    "mood" TEXT NOT NULL,
    "colorCode" TEXT NOT NULL,

    CONSTRAINT "moodColor_pkey" PRIMARY KEY ("id")
);
