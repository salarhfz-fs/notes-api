import { Controller, Get, Post, Param, NotFoundException, Body } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  listUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('note not found');
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }
}
