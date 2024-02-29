import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(@Body() loginUser: LoginDto, @Req() req: Request, @Res() res: Response) {
        const { email, senha } = loginUser;

        const usuario = await this.authService.validateUser(email, senha);

        const { senha: _, ...result } = usuario;

        const token = await this.authService.getToken(usuario);

        return res.status(HttpStatus.ACCEPTED).json({ mensagem: 'Usuário logado com sucesso.', usuario: result, token });

    }
}
