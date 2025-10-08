-- CreateTable
CREATE TABLE "agendas" (
    "id" SERIAL NOT NULL,
    "scope" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "agendas_pkey" PRIMARY KEY ("id")
);
