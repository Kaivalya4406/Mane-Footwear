-- This is an empty migration.
-- AlterTable: add new columns (priceInPaise temporarily nullable for backfill)
ALTER TABLE "Product" ADD COLUMN "priceInPaise" INTEGER;
ALTER TABLE "Product" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Product" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Product" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill exact known prices for existing seeded products
UPDATE "Product" SET "priceInPaise" = 149900 WHERE "id" = 'formal-oxford';
UPDATE "Product" SET "priceInPaise" = 129900 WHERE "id" = 'comfort-sneakers';
UPDATE "Product" SET "priceInPaise" = 69900  WHERE "id" = 'kids-school-shoes';
UPDATE "Product" SET "priceInPaise" = 89900  WHERE "id" = 'womens-ballet-flats';
UPDATE "Product" SET "priceInPaise" = 199900 WHERE "id" = 'leather-loafers';
UPDATE "Product" SET "priceInPaise" = 59900  WHERE "id" = 'casual-sandals';
UPDATE "Product" SET "priceInPaise" = 79900  WHERE "id" = 'kids-casual-sneakers';

-- Enforce NOT NULL now that all existing rows are backfilled
ALTER TABLE "Product" ALTER COLUMN "priceInPaise" SET NOT NULL;