/*
  Warnings:

  - Made the column `locationId` on table `Hotel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ratesSummaryId` on table `Hotel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_ratesSummaryId_fkey";

-- AlterTable
ALTER TABLE "Hotel" ALTER COLUMN "locationId" SET NOT NULL,
ALTER COLUMN "ratesSummaryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_ratesSummaryId_fkey" FOREIGN KEY ("ratesSummaryId") REFERENCES "RatesSummary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
