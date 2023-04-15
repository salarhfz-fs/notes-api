import { Controller, Get, Post, Param, Body, Query, Patch, Delete } from '@nestjs/common';

import {Serialize} from 'src/common/decorators/serialize.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import {UserDto} from './dtos/user.dto';
import {UsersService} from './users.service';

@Serialize(UserDto)
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  listUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
