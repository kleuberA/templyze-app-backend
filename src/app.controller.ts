import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from './auth/decorators/ispublic.decorator';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
