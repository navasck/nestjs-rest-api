import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface HelloMessage {
  id: number;
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): HelloMessage[] {
    return this.appService.getHello();
  }
}
