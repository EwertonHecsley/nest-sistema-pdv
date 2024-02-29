import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { HashService } from './hash/hash.service';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

@Module({
    providers: [UsuariosService, HashService, PrismaService]
})
export class UsuariosModule { }
