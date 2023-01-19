-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habitWeekDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "habitWeekDay_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habitWeekDay" ("habit_id", "id", "week_day") SELECT "habit_id", "id", "week_day" FROM "habitWeekDay";
DROP TABLE "habitWeekDay";
ALTER TABLE "new_habitWeekDay" RENAME TO "habitWeekDay";
CREATE UNIQUE INDEX "habitWeekDay_habit_id_week_day_key" ON "habitWeekDay"("habit_id", "week_day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
