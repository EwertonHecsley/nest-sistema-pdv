import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Module({
  providers: [PedidosService, PrismaService],
  controllers: [PedidosController]
})
export class PedidosModule { }
