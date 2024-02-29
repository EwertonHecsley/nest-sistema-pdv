import { Injectable } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Injectable()
export class UsuariosService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly hashService: HashService
    ) { }

    async getUserByEmail(email: string) {
        return await this.prismaService.usuario.findUnique({
            where: {
                email
            }
        })
    }
}
