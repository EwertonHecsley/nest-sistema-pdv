import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guards';
import { PedidoDto } from './dto/pedido.dto';
import { Response } from 'express';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('pedido')
export class PedidosController {
    constructor(
        private readonly pedidosService: PedidosService,
        private readonly prismaService: PrismaService
    ) { }

    @Post()
    async create(@Body() dataPedido: PedidoDto, @Res() res: Response) {
        const { cliente_id, pedido_produtos } = dataPedido;
        if (!await this.prismaService.cliente.findUnique({
            where: {
                id: cliente_id
            }
        })) throw new HttpException('Cliente não encontrado.', HttpStatus.NOT_FOUND);

        if (pedido_produtos.length === 0) throw new HttpException('Pedido vazio.', HttpStatus.BAD_REQUEST);

        await this.pedidosService.createPedido(dataPedido);

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Pedido cadastrado com sucesso.' });
    }

    @Get()
    async listAll(@Res() res: Response) {
        const result = await this.pedidosService.listAllPedidos();

        return res.status(HttpStatus.OK).json(result);
    }

}
