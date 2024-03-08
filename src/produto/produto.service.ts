import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoriasService } from 'src/categorias/categorias.service';
import { ProdutoDto } from './dto/produto.dto';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { ArquivosService } from 'src/arquivos/arquivos.service';

@Injectable()
export class ProdutoService {
    constructor(
        private readonly categoriaService: CategoriasService,
        private readonly prismaService: PrismaService,
        private readonly bucketService: ArquivosService
    ) { }

    async create(file: Express.Multer.File, data: ProdutoDto): Promise<ProdutoDto> {
        const { categoria_id, descricao, quantidade_estoque, valor } = data;

        const categoriaExist = await this.categoriaService.getById(Number(categoria_id));
        if (!categoriaExist) throw new HttpException('Categoria de produto não encontrado.', HttpStatus.NOT_FOUND);

        let produto = await this.prismaService.produto.create({
            data: {
                descricao,
                quantidade_estoque: Number(quantidade_estoque),
                valor: Number(valor),
                categoria_id: Number(categoria_id)
            }
        })

        if (file) {
            const { buffer, mimetype, originalname } = file;
            const { id } = produto;

            const imagem = await this.bucketService.upload(`produtos/${id}/${originalname}`, buffer, mimetype);

            produto = await this.prismaService.produto.update({
                where: {
                    id
                },
                data: {
                    produto_imagem: imagem.url
                }
            })
        }

        return produto;
    }

    async update(id: number, data: ProdutoDto): Promise<ProdutoDto> {
        const { categoria_id, descricao, quantidade_estoque, valor, produto_imagem } = data;

        const produtoExiste = await this.getById(id);
        if (!produtoExiste) throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND);

        const categoriaExist = await this.categoriaService.getById(Number(categoria_id));
        if (!categoriaExist) throw new HttpException('Categoria de produto não encontrado.', HttpStatus.NOT_FOUND);

        return await this.prismaService.produto.update({
            where: {
                id
            },
            data: {
                descricao,
                quantidade_estoque: Number(quantidade_estoque),
                valor: Number(valor),
                categoria_id: Number(categoria_id),
                produto_imagem
            }
        })
    }

    async destroy(id: number) {
        const produto = await this.getById(id);
        if (!produto) throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND);

        const verifyProductContainPedido = await this.prismaService.pedidoProduto.findMany({ where: { produto_id: id } });

        if (verifyProductContainPedido.length > 0) throw new HttpException('Produto possui pedido cadastrado.', HttpStatus.BAD_REQUEST);

        return await this.prismaService.produto.delete({
            where: {
                id
            }
        })
    }

    async getAllProducts(categoria_id?: string): Promise<ProdutoDto[]> {
        const produtos = await this.prismaService.produto.findMany();

        if (categoria_id) {
            return produtos.filter(produto => produto.categoria_id === parseInt(categoria_id));
        }

        return produtos;
    }

    async getById(id: number): Promise<ProdutoDto> {
        return await this.prismaService.produto.findUnique({
            where: {
                id
            }
        })
    }
}
