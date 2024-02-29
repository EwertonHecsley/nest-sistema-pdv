import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [DatabaseModule, CategoriasModule, UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
