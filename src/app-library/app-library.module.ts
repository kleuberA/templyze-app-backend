import { Module } from '@nestjs/common';
import { AppLibraryService } from './app-library.service';
import { AppLibraryController } from './app-library.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AppLibraryService, PrismaService],
  controllers: [AppLibraryController],
})
export class AppLibraryModule { }
