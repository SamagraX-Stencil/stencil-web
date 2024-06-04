-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigHistory" (
    "id" SERIAL NOT NULL,
    "configId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConfigHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConfigHistory" ADD CONSTRAINT "ConfigHistory_configId_fkey" FOREIGN KEY ("configId") REFERENCES "Config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
