import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuario.dto';
import { Response } from 'express';

@Controller('usuario')
export class UsuariosController {
    constructor(private readonly usuarioService: UsuariosService) { }

    @Post()
    async createUser(@Body() user: UsuarioDto, @Res() res: Response) {
        const { senha: _, ...usuario } = await this.usuarioService.create(user);

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario })
    }
}
