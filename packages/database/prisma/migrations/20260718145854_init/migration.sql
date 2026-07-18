-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "scheduledSlot" TIMESTAMP(3),
    "preferredDate" TEXT NOT NULL,
    "message" TEXT,
    "source" TEXT NOT NULL DEFAULT 'booking',
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "statusToken" TEXT NOT NULL,
    "currentStage" TEXT NOT NULL DEFAULT 'ENQUIRY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageUpdate" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StageUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referrerName" TEXT NOT NULL,
    "referrerPhone" TEXT NOT NULL,
    "refereeName" TEXT NOT NULL,
    "refereePhone" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_statusToken_key" ON "Project"("statusToken");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_code_key" ON "Referral"("code");

-- AddForeignKey
ALTER TABLE "StageUpdate" ADD CONSTRAINT "StageUpdate_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
