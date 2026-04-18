-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cv" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "job" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Cv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "designation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CvSkills" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CvSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Cv" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CvSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CvSkills_AB_unique" ON "_CvSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_CvSkills_B_index" ON "_CvSkills"("B");
