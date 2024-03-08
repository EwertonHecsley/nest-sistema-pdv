import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MustacheService } from '../mustache/mustache.service';

@Module({
  providers: [EmailService, MustacheService]
})
export class EmailModule { }
