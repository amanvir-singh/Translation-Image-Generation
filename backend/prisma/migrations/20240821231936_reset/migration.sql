-- CreateTable
CREATE TABLE "interviewQuestions" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "numberOfQuestions" INTEGER NOT NULL,
    "questions" TEXT NOT NULL,

    CONSTRAINT "interviewQuestions_pkey" PRIMARY KEY ("id")
);
