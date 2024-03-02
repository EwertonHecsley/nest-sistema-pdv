import { Injectable } from '@nestjs/common';
import { Cliente } from '@prisma/client';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Injectable()
export class ClientesService {
    constructor(private readonly prismaSErvice: PrismaService) { }

    async getAllClients(): Promise<Cliente[]> {
        return await this.prismaSErvice.cliente.findMany();
    }
}
