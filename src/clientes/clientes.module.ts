import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { CpfValidator } from './utils/cpf.validate';

@Module({
  providers: [ClientesService, PrismaService, CpfValidator],
  controllers: [ClientesController]
})
export class ClientesModule { }
