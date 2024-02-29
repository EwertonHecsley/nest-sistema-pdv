import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';

@Module({
    providers: [PrismaService]
})
export class DatabaseModule { }
