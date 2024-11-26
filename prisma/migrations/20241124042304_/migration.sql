/*
  Warnings:

  - Made the column `locationId` on table `Trail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ratesSummaryId` on table `Trail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Trail" DROP CONSTRAINT "Trail_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Trail" DROP CONSTRAINT "Trail_ratesSummaryId_fkey";

-- AlterTable
ALTER TABLE "Trail" ALTER COLUMN "locationId" SET NOT NULL,
ALTER COLUMN "ratesSummaryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Trail" ADD CONSTRAINT "Trail_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trail" ADD CONSTRAINT "Trail_ratesSummaryId_fkey" FOREIGN KEY ("ratesSummaryId") REFERENCES "RatesSummary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
