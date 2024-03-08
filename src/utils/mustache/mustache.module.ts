import { Module } from '@nestjs/common';
import { MustacheService } from './mustache.service';

@Module({
  providers: [MustacheService]
})
export class MustacheModule { }
