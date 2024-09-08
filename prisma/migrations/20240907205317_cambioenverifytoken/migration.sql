/*
  Warnings:

  - The primary key for the `ForgotenToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ForgotenToken" DROP CONSTRAINT "ForgotenToken_pkey",
ADD CONSTRAINT "ForgotenToken_pkey" PRIMARY KEY ("identifier");

-- AlterTable
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey",
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier");
