import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoriasService } from 'src/categorias/categorias.service';
import { ProdutoDto } from './dto/produto.dto';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Injectable()
export class ProdutoService {
    constructor(
        private readonly categoriaService: CategoriasService,
        private readonly prismaService: PrismaService
    ) { }

    async create(data: ProdutoDto): Promise<ProdutoDto> {
        const categoriaExist = await this.categoriaService.getById(data.categoria_id);
        if (!categoriaExist) throw new HttpException('Categoria de produto não encontrado.', HttpStatus.NOT_FOUND);

        return await this.prismaService.produto.create({
            data
        })
    }
}
