/*
  Warnings:

  - You are about to drop the column `quantite` on the `ProductOption` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productOptionId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "ProductOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "type" TEXT NOT NULL,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "inStock" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Product" ("description", "id", "imageUrl", "name", "recommended", "type") SELECT "description", "id", "imageUrl", "name", "recommended", "type" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_ProductOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ProductOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductOption" ("id", "price", "productId", "size") SELECT "id", "price", "productId", "size" FROM "ProductOption";
DROP TABLE "ProductOption";
ALTER TABLE "new_ProductOption" RENAME TO "ProductOption";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
