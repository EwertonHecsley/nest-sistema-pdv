import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guards';

@Controller('cliente')
export class ClientesController {
    constructor(private readonly clienteService: ClientesService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Res() res: Response) {
        return res.json(await this.clienteService.getAllClients());
    }
}
