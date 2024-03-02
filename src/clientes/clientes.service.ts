import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { ClienteDto } from './dto/cliente.dto';

@Injectable()
export class ClientesService {
    constructor(private readonly prismaService: PrismaService) { }

    async createClient(dataCliente: ClienteDto) {
        return await this.prismaService.cliente.create({
            data: dataCliente
        })
    }

    async updateClient(id: number, dataCliente: ClienteDto) {
        return await this.prismaService.cliente.update({
            where: { id },
            data: dataCliente
        })
    }

    async getAllClients(): Promise<ClienteDto[]> {
        return await this.prismaService.cliente.findMany({
            orderBy: {
                id: 'asc'
            }
        });
    }

    async getClientByEmail(email: string): Promise<ClienteDto> {
        return await this.prismaService.cliente.findUnique({
            where: {
                email
            }
        })
    }

    async getClientByCpf(cpf: string): Promise<ClienteDto> {
        return await this.prismaService.cliente.findUnique({
            where: {
                cpf
            }
        })
    }

    async getClientById(id: number): Promise<ClienteDto> {
        return await this.prismaService.cliente.findUnique({
            where: {
                id
            }
        })
    }
}
