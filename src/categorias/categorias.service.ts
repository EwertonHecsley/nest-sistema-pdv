import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Injectable()
export class CategoriasService {
    constructor(private readonly prisma: PrismaService) { }

    async getAll() {
        return await this.prisma.categoria.findMany();
    }
}
