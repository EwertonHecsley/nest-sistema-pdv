import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Module({
    providers: [CategoriasService, PrismaService],
    controllers: [CategoriasController]
})
export class CategoriasModule { }
