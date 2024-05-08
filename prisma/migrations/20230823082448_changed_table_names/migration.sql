/*
  Warnings:

  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SwarmActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SwarmResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "SwarmActivity" DROP CONSTRAINT "SwarmActivity_swarm_id_fkey";

-- DropForeignKey
ALTER TABLE "SwarmResult" DROP CONSTRAINT "SwarmResult_swarm_id_fkey";

-- DropTable
DROP TABLE "Setting";

-- DropTable
DROP TABLE "SwarmActivity";

-- DropTable
DROP TABLE "SwarmResult";

-- CreateTable
CREATE TABLE "SwarmResults" (
    "id" SERIAL NOT NULL,
    "swarm_id" INTEGER NOT NULL,
    "mturk_hits_results" JSONB NOT NULL,
    "swarm_ai_results" JSONB NOT NULL,
    "status" "SwarmResultsStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SwarmResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "status" "SettingsStatus" NOT NULL DEFAULT 'ENABLED',
    "notification_settings" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SwarmActivities" (
    "id" SERIAL NOT NULL,
    "swarm_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SwarmActivities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SwarmResults_swarm_id_key" ON "SwarmResults"("swarm_id");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_profile_id_key" ON "Settings"("profile_id");

-- AddForeignKey
ALTER TABLE "SwarmResults" ADD CONSTRAINT "SwarmResults_swarm_id_fkey" FOREIGN KEY ("swarm_id") REFERENCES "Swarm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwarmActivities" ADD CONSTRAINT "SwarmActivities_swarm_id_fkey" FOREIGN KEY ("swarm_id") REFERENCES "Swarm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
