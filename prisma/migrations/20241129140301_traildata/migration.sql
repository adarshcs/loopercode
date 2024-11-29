/*
  Warnings:

  - You are about to drop the column `locationId` on the `Trail` table. All the data in the column will be lost.
  - You are about to drop the column `ratesSummaryId` on the `Trail` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RatesSummary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `Trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Trail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trail" DROP CONSTRAINT "Trail_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Trail" DROP CONSTRAINT "Trail_ratesSummaryId_fkey";

-- DropIndex
DROP INDEX "Trail_locationId_key";

-- DropIndex
DROP INDEX "Trail_ratesSummaryId_key";

-- AlterTable
ALTER TABLE "Trail" DROP COLUMN "locationId",
DROP COLUMN "ratesSummaryId",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rate" INTEGER,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "RatesSummary";
