import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { EmailService } from 'src/utils/email/email.service';
import { MustacheService } from 'src/utils/mustache/mustache.service';

@Module({
  providers: [PedidosService, PrismaService, EmailService, MustacheService],
  controllers: [PedidosController]
})
export class PedidosModule { }
