import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { CategoriasService } from 'src/categorias/categorias.service';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Module({
  providers: [ProdutoService, CategoriasService, PrismaService],
  controllers: [ProdutoController]
})
export class ProdutoModule { }
