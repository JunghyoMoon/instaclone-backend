-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "title" INTEGER NOT NULL,
    "genre" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
