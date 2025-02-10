/*
  Warnings:

  - You are about to drop the `_RoomToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RoomToUser" DROP CONSTRAINT "_RoomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToUser" DROP CONSTRAINT "_RoomToUser_B_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "members" TEXT[];

-- DropTable
DROP TABLE "_RoomToUser";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_members_fkey" FOREIGN KEY ("members") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
