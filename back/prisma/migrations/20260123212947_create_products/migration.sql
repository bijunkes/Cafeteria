-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "size" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantite" INTEGER NOT NULL
);
