import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { UsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly hashService: HashService
    ) { }

    async create(user: UsuarioDto): Promise<UsuarioDto> {
        const { nome, email, senha } = user;
        const usuario = await this.getUserByEmail(email);

        if (usuario) throw new HttpException('E-mail já cadastrado.', HttpStatus.BAD_REQUEST);

        const hashPassword = await this.hashService.hashPassword(senha);

        const result = await this.prismaService.usuario.create({
            data: {
                nome,
                email,
                senha: hashPassword
            }
        })

        return result;
    }

    async getUserByEmail(email: string): Promise<UsuarioDto> {
        return await this.prismaService.usuario.findUnique({
            where: {
                email
            }
        })
    }
}
