import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashService } from 'src/usuarios/hash/hash.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }
        }),
        PassportModule
    ],
    providers: [
        AuthService,
        HashService,
        UsuariosService,
        JwtService,
        PrismaService,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [AuthController]
})
export class AuthModule { }
