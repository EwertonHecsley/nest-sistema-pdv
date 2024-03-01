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

    async getUserById(id: number): Promise<UsuarioDto> {
        return await this.prismaService.usuario.findUnique({
            where: {
                id
            }
        })
    }

    async updateUser(id: number, dataUser: UsuarioDto) {
        const usuario = await this.getUserById(id);
        if (!usuario) throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);

        const emailVerify = await this.getUserByEmail(dataUser.email);
        if (emailVerify) throw new HttpException('E-mail já cadastrado.', HttpStatus.BAD_REQUEST);

        const hashNewPassword = await this.hashService.hashPassword(dataUser.senha);

        return await this.prismaService.usuario.update({
            where: {
                id: usuario.id
            },
            data: {
                nome: dataUser.nome,
                email: dataUser.email,
                senha: hashNewPassword

            }
        })
    }

}
