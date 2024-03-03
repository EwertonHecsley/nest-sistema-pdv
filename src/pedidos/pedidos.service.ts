import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Injectable()
export class PedidosService {
    constructor(private readonly prismaService: PrismaService) { }

    async createPedido(dataPedido) {
        return await this.prismaService.pedido.create({
            data: dataPedido
        })
    }
}
