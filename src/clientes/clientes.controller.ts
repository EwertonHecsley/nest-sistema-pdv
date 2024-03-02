import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guards';
import { ClienteDto } from './dto/cliente.dto';
import { CpfValidator } from './utils/cpf.validate';

@UseGuards(JwtAuthGuard)
@Controller('cliente')
export class ClientesController {
    constructor(
        private readonly clienteService: ClientesService,
        private readonly cpfService: CpfValidator
    ) { }

    @Post()
    async create(@Body() dataCliente: ClienteDto, @Res() res: Response) {
        const { nome, email, cpf } = dataCliente;

        if (!this.cpfService.isValid(cpf)) throw new HttpException('Formato CPF Inválido.', HttpStatus.BAD_REQUEST);

        if (await this.clienteService.getClientByCpf(cpf)) throw new HttpException('CPF já cadastrado.', HttpStatus.BAD_REQUEST);


        if (await this.clienteService.getClientByEmail(email)) throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);

        const cliente = await this.clienteService.createClient({ nome, email, cpf });

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Cliente cadastrado com sucesso.', cliente });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dataCliente: ClienteDto, @Res() res: Response) {
        const { nome, email, cpf } = dataCliente;

        if (!await this.clienteService.getClientById(parseInt(id))) throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);

        if (!this.cpfService.isValid(cpf)) throw new HttpException('Formato CPF Inválido.', HttpStatus.BAD_REQUEST);

        if (await this.clienteService.getClientByCpf(cpf)) throw new HttpException('CPF já cadastrado.', HttpStatus.BAD_REQUEST);

        if (await this.clienteService.getClientByEmail(email)) throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);

        await this.clienteService.updateClient(parseInt(id), { nome, email, cpf });

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Res() res: Response) {
        const cliente = await this.clienteService.getClientById(parseInt(id));

        if (!cliente) throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);

        return res.status(HttpStatus.OK).json({ mensagem: 'Cliente encontrado com sucesso.', cliente });
    }

    @Get()
    async getAll(@Res() res: Response) {
        return res.json(await this.clienteService.getAllClients());
    }
}
