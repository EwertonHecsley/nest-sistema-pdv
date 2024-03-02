import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guards';
import { ClienteDto } from './dto/cliente.dto';

@UseGuards(JwtAuthGuard)
@Controller('cliente')
export class ClientesController {
    constructor(private readonly clienteService: ClientesService) { }

    @Post()
    async create(@Body() dataCliente: ClienteDto, @Res() res: Response) {
        const { nome, email, cpf } = dataCliente;

        if (await this.clienteService.getClientByCpf(cpf)) throw new HttpException('CPF já cadastrado.', HttpStatus.BAD_REQUEST);


        if (await this.clienteService.getClientByEmail(email)) throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);

        const cliente = await this.clienteService.createClient({ nome, email, cpf });

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Cliente cadastrado com sucesso.', cliente });
    }

    @Get()
    async getAll(@Res() res: Response) {
        return res.json(await this.clienteService.getAllClients());
    }
}
