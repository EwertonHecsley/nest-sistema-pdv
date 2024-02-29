import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';
import { HashService } from 'src/usuarios/hash/hash.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuariosService,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
        private readonly configService: ConfigService
    ) { }

    async validateUser(email: string, senha: string): Promise<UsuarioDto> {
        const usuario = await this.usuarioService.getUserByEmail(email);
        if (!usuario) throw new UnauthorizedException('E-mail não encontrado.');

        const verifyPassword = await this.hashService.compareHash(senha, usuario.senha);

        if (!verifyPassword) throw new UnauthorizedException('Senha inválida.');

        return usuario;
    }

    async getToken(usuario: UsuarioDto): Promise<string> {
        const secret = this.configService.get<string>('JWT_SECRET');
        return await this.jwtService.signAsync({ id: usuario.id, email: usuario.email }, { secret });
    }
}
