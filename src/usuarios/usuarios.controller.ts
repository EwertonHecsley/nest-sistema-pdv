import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuario.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guards';

@Controller('usuario')
export class UsuariosController {
    constructor(private readonly usuarioService: UsuariosService) { }

    @Post()
    async createUser(@Body() user: UsuarioDto, @Res() res: Response) {
        const { senha: _, ...usuario } = await this.usuarioService.create(user);

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario })
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateUser(@Body() dataUsuario: UsuarioDto, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;
        await this.usuarioService.updateUser(id, dataUsuario);

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;
        const usuario = await this.usuarioService.getUserById(id);
        const { senha: _, ...result } = usuario;

        return res.json(result);
    }
}
