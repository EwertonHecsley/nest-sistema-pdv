import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guards';
import { PedidoDto } from './dto/pedido.dto';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('pedido')
export class PedidosController {
    constructor(private readonly pedidosService: PedidosService) { }

    @Post()
    async create(@Body() dataPedido: PedidoDto, @Res() res: Response) {
        await this.pedidosService.createPedido(dataPedido);

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Pedido cadastrado com sucesso.' });
    }
}
