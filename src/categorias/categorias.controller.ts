import { Controller, Get, Res } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Response } from 'express';

@Controller('categoria')
export class CategoriasController {
    constructor(private readonly categoriaService: CategoriasService) { }

    @Get()
    async getAll(@Res() res: Response) {
        return res.json(await this.categoriaService.getAll());
    }
}
