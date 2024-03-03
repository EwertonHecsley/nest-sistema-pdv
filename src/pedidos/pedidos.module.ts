import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { MetodosExtras } from './utils/metodosExtras';

@Module({
  providers: [PedidosService, PrismaService, MetodosExtras],
  controllers: [PedidosController]
})
export class PedidosModule { }
