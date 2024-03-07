import { Module } from '@nestjs/common';
import { ArquivosService } from './arquivos.service';

@Module({
  providers: [ArquivosService]
})
export class ArquivosModule { }
