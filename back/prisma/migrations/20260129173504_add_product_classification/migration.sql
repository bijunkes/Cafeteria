/*
  Warnings:

  - Added the required column `recommended` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "type" TEXT NOT NULL,
    "recommended" BOOLEAN NOT NULL
);
INSERT INTO "new_Product" ("description", "id", "imageUrl", "name") SELECT "description", "id", "imageUrl", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
