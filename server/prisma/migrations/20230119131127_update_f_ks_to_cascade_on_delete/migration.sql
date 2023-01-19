-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_habit" ("created_at", "id", "title") SELECT "created_at", "id", "title" FROM "habit";
DROP TABLE "habit";
ALTER TABLE "new_habit" RENAME TO "habit";
CREATE TABLE "new_dayHabit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    CONSTRAINT "dayHabit_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "day" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "dayHabit_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_dayHabit" ("day_id", "habit_id", "id") SELECT "day_id", "habit_id", "id" FROM "dayHabit";
DROP TABLE "dayHabit";
ALTER TABLE "new_dayHabit" RENAME TO "dayHabit";
CREATE UNIQUE INDEX "dayHabit_day_id_habit_id_key" ON "dayHabit"("day_id", "habit_id");
CREATE TABLE "new_habitWeekDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "habitWeekDay_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_habitWeekDay" ("habit_id", "id", "week_day") SELECT "habit_id", "id", "week_day" FROM "habitWeekDay";
DROP TABLE "habitWeekDay";
ALTER TABLE "new_habitWeekDay" RENAME TO "habitWeekDay";
CREATE UNIQUE INDEX "habitWeekDay_habit_id_week_day_key" ON "habitWeekDay"("habit_id", "week_day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
