import { Controller, Get, Post, Param, Body, Query, Patch, Delete, HttpCode, Session, UseInterceptors, UseGuards } from '@nestjs/common';

import {CurrentUser} from 'src/common/decorators/current-user.decorator';
import {Serialize} from 'src/common/decorators/serialize.decorator';
import {AuthGuard} from 'src/common/guards/auth.guard';
import {CurrentUserInterceptor} from 'src/common/interceptors/current-user.interceptor';
import {AuthService} from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import {UserSigninDto} from './dtos/user-signin.dto';
import {UserSignupDto} from './dtos/user-signup.dto';
import {UserDto} from './dtos/user.dto';
import {User} from './models/user.entity';
import {UsersService} from './users.service';

@UseInterceptors(CurrentUserInterceptor)
@Serialize(UserDto)
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Get()
  listUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Post('/sign-up')
  signUp(@Body() body: UserSignupDto) {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  @HttpCode(200)
  async signIn(@Body() body: UserSigninDto, @Session() session: any) {
    const user = await  this.authService.signIn(body);
    if (user) session.userId = user.id;
    return user;
  }

  @Post('/sign-out')
  @HttpCode(200)
  signOut(@Session() session: any) {
    session.userId = null;
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
