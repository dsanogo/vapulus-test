import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import users from './config/users';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  @ApiOkResponse({description: 'Users list'})
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return {
      statusCode: HttpStatus.OK,
      message: "All users",
      data: users
    }
  }
}
