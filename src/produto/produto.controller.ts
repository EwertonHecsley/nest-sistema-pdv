import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guards';
import { ProdutoDto } from './dto/produto.dto';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('produto')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) { }

    @Post()
    async createProduct(@Body() dataProduto: ProdutoDto, @Res() res: Response) {
        const produto = await this.produtoService.create(dataProduto);

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Produto cadastrado com sucesso.', produto });
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() dataProduto: ProdutoDto, @Res() res: Response) {
        await this.produtoService.update(parseInt(id), dataProduto);

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Get()
    async getAllProducts(@Res() res: Response, @Query('categoria_id') categoria_id?: string) {
        return res.json(await this.produtoService.getAllProducts(categoria_id));
    }
}
