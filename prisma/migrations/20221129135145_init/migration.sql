-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'REFEREE_MANAGER', 'COMPETITION_MANAGER', 'FINANCE_EMPLOYEE', 'FINANCE_MANAGER');

-- CreateEnum
CREATE TYPE "RefereeType" AS ENUM ('MAIN', 'ASSISTANCE', 'FOURTH');

-- CreateEnum
CREATE TYPE "League" AS ENUM ('PRIMIER', 'HIGHER', 'WOMEN', 'WOMEN_HIGH', 'NATIONAL', 'U20', 'U17');

-- CreateEnum
CREATE TYPE "FinanceDataStatus" AS ENUM ('OPEN', 'PENDDING', 'REJECTED', 'APPROVED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referees" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "initial" TEXT NOT NULL,
    "type" "RefereeType" NOT NULL,
    "league" "League" NOT NULL,

    CONSTRAINT "referees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commissioners" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "initial" TEXT NOT NULL,
    "league" "League" NOT NULL,

    CONSTRAINT "commissioners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "league" "League" NOT NULL,
    "mainRefereeId" INTEGER NOT NULL,
    "assistanceRefereeOneId" INTEGER NOT NULL,
    "assistanceRefereeTwoId" INTEGER NOT NULL,
    "fourthRefereeId" INTEGER NOT NULL,
    "commissionerId" INTEGER NOT NULL,
    "match" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "rejectionReason" TEXT,
    "status" "FinanceDataStatus" NOT NULL DEFAULT 'OPEN',
    "mainRefereeNumberOfDays" INTEGER NOT NULL DEFAULT 0,
    "mainRefereeComissionPerDay" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "mainRefereeTalentComission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "mainRefereeTotalComission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "assistanceRefereeOneNumberOfDays" INTEGER NOT NULL DEFAULT 0,
    "assistanceRefereeOneComissionPerDay" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "assistanceRefereeOneTalentComission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "assistanceRefereeOneTotalComission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "assistanceRefereeTwoNumberOfDays" INTEGER NOT NULL DEFAULT 0,
    "assistanceRefereeTwoComissionPerDay" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "assistanceRefereeTwoTalentComission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "assistanceRefereeTwoTotalComission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "fourthRefereeNumberOfDays" INTEGER NOT NULL DEFAULT 0,
    "fourthRefereeComissionPerDay" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "fourthRefereeTalentComission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "fourthRefereeTotalComission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "commissionerNumberOfDays" INTEGER NOT NULL DEFAULT 0,
    "commissionerComissionPerDay" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "commissionerTalentComission" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "commissionerTotalComission" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_commissionerId_fkey" FOREIGN KEY ("commissionerId") REFERENCES "commissioners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_mainRefereeId_fkey" FOREIGN KEY ("mainRefereeId") REFERENCES "referees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_fourthRefereeId_fkey" FOREIGN KEY ("fourthRefereeId") REFERENCES "referees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_assistanceRefereeOneId_fkey" FOREIGN KEY ("assistanceRefereeOneId") REFERENCES "referees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_assistanceRefereeTwoId_fkey" FOREIGN KEY ("assistanceRefereeTwoId") REFERENCES "referees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
