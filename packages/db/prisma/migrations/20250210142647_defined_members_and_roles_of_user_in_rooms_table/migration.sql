-- CreateEnum
CREATE TYPE "Role" AS ENUM ('member', 'admin');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "members" TEXT[],
ADD COLUMN     "role" "Role"[];
