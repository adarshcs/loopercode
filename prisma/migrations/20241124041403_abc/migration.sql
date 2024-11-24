-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locationId" INTEGER,
    "ratesSummaryId" INTEGER,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatesSummary" (
    "id" SERIAL NOT NULL,
    "minPrice" TEXT NOT NULL,

    CONSTRAINT "RatesSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_locationId_key" ON "Hotel"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_ratesSummaryId_key" ON "Hotel"("ratesSummaryId");

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_ratesSummaryId_fkey" FOREIGN KEY ("ratesSummaryId") REFERENCES "RatesSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
