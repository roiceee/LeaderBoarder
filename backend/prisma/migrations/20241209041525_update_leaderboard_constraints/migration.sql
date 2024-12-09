/*
  Warnings:

  - A unique constraint covering the columns `[public_slug]` on the table `leaderboards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `leaderboards` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "leaderboards_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "leaderboards_public_slug_key" ON "leaderboards"("public_slug");

-- CreateIndex
CREATE UNIQUE INDEX "leaderboards_slug_key" ON "leaderboards"("slug");
