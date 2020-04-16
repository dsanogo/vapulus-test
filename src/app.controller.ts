import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import users from './config/users';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return {
      statusCode: HttpStatus.OK,
      message: "All users",
      data: users
    }
  }
}
