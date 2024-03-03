import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { PedidoDto } from './dto/pedido.dto';

@Injectable()
export class PedidosService {
    constructor(private readonly prismaService: PrismaService) { }


}

