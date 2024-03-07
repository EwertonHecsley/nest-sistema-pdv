import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProdutoModule } from './produto/produto.module';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ArquivosModule } from './arquivos/arquivos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CategoriasModule,
    UsuariosModule,
    AuthModule,
    ProdutoModule,
    ClientesModule,
    PedidosModule,
    ArquivosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
