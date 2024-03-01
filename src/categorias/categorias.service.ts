import { Injectable } from '@nestjs/common';
import { Categoria } from '@prisma/client';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Injectable()
export class CategoriasService {
    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<Categoria[]> {
        return await this.prisma.categoria.findMany();
    }

    async getById(id: number): Promise<Categoria> {
        return await this.prisma.categoria.findUnique({ where: { id } })
    }
}
