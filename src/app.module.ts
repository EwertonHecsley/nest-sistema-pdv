import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CategoriasModule,
    UsuariosModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
