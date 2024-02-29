import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [DatabaseModule, CategoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
