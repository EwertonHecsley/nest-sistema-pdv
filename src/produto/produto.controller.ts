import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guards';
import { ProdutoDto } from './dto/produto.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('produto')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) { }

    @Post()
    @UseInterceptors(FileInterceptor('produto_imagem'))
    async createProduct(
        @UploadedFile() produto_imagem: Express.Multer.File,
        @Body() dataProduto: ProdutoDto,
        @Res() res: Response) {

        const produto = await this.produtoService.create(produto_imagem, dataProduto);

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Produto cadastrado com sucesso.', produto });
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() dataProduto: ProdutoDto, @Res() res: Response) {
        await this.produtoService.update(parseInt(id), dataProduto);

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string, @Res() res: Response) {
        await this.produtoService.destroy(parseInt(id));

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string, @Res() res: Response) {
        const produto = await this.produtoService.getById(parseInt(id));
        if (!produto) throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND);

        return res.status(HttpStatus.OK).json(produto);
    }

    @Get()
    async getAllProducts(@Res() res: Response, @Query('categoria_id') categoria_id?: string) {
        return res.json(await this.produtoService.getAllProducts(categoria_id));
    }
}
