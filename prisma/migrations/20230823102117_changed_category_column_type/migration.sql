/*
  Warnings:

  - Changed the type of `category` on the `Swarm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Swarm" DROP COLUMN "category",
ADD COLUMN     "category" VARCHAR(255) NOT NULL;
