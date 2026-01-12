/*
  Warnings:

  - You are about to drop the column `end_time` on the `models` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `models` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `models` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `models` table. All the data in the column will be lost.
  - You are about to drop the column `diff_percent` on the `recommendations` table. All the data in the column will be lost.
  - You are about to drop the column `finished_at` on the `recommendations` table. All the data in the column will be lost.
  - You are about to drop the column `predicted_price` on the `recommendations` table. All the data in the column will be lost.
  - You are about to drop the column `recommendation` on the `recommendations` table. All the data in the column will be lost.
  - You are about to drop the `candles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[external_name]` on the table `models` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `external_name` to the `models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `training_period` to the `models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_price` to the `recommendations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `history` to the `recommendations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prediction` to the `recommendations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trend` to the `recommendations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `recommendations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "models" DROP CONSTRAINT "models_user_id_fkey";

-- DropIndex
DROP INDEX "recommendations_model_id_created_at_idx";

-- AlterTable
ALTER TABLE "models" DROP COLUMN "end_time",
DROP COLUMN "start_time",
DROP COLUMN "status",
DROP COLUMN "user_id",
ADD COLUMN     "external_name" TEXT NOT NULL,
ADD COLUMN     "training_period" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recommendations" DROP COLUMN "diff_percent",
DROP COLUMN "finished_at",
DROP COLUMN "predicted_price",
DROP COLUMN "recommendation",
ADD COLUMN     "current_price" DECIMAL(18,8) NOT NULL,
ADD COLUMN     "history" JSONB NOT NULL,
ADD COLUMN     "prediction" JSONB NOT NULL,
ADD COLUMN     "trend" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "candles";

-- CreateIndex
CREATE UNIQUE INDEX "models_external_name_key" ON "models"("external_name");

-- CreateIndex
CREATE INDEX "models_symbol_interval_training_period_idx" ON "models"("symbol", "interval", "training_period");

-- CreateIndex
CREATE INDEX "recommendations_user_id_created_at_idx" ON "recommendations"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
