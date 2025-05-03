import { Module } from '@nestjs/common';
import { UserappService } from './userapp.service';
import { UserappController } from './userapp.controller';

@Module({
  providers: [UserappService],
  controllers: [UserappController]
})
export class UserappModule {}
