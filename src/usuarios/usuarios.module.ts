import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { HashService } from './hash/hash.service';

@Module({
    providers: [UsuariosService, HashService]
})
export class UsuariosModule { }
