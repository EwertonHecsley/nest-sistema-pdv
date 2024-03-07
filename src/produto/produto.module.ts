import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { CategoriasService } from 'src/categorias/categorias.service';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { ArquivosService } from 'src/arquivos/arquivos.service';

@Module({
  providers: [ProdutoService, CategoriasService, PrismaService, ArquivosService],
  controllers: [ProdutoController]
})
export class ProdutoModule { }
