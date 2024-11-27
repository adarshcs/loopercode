-- CreateTable
CREATE TABLE "Trail" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locationId" INTEGER,
    "ratesSummaryId" INTEGER,

    CONSTRAINT "Trail_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Trail_locationId_key" ON "Trail"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Trail_ratesSummaryId_key" ON "Trail"("ratesSummaryId");

-- AddForeignKey
ALTER TABLE "Trail" ADD CONSTRAINT "Trail_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trail" ADD CONSTRAINT "Trail_ratesSummaryId_fkey" FOREIGN KEY ("ratesSummaryId") REFERENCES "RatesSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
