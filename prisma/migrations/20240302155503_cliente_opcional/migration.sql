-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "cep" DROP NOT NULL,
ALTER COLUMN "rua" DROP NOT NULL,
ALTER COLUMN "numero" DROP NOT NULL,
ALTER COLUMN "bairro" DROP NOT NULL,
ALTER COLUMN "cidade" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL;
