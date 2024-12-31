import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(@Res response) {
    this.appService.getHello();
    response.status(202).send('modified response');
  }
}
