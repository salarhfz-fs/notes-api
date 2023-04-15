import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import {User} from './models/user.entity';
import {UsersService} from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(userDto: Partial<User>) {
    const [existingUser] = await this.usersService.findAll(userDto.email);
    if (existingUser) throw new ConflictException('user already exists');
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(userDto.password, salt, 32)) as Buffer;
    const passwordHash = salt + '.' + hash.toString('hex');
    Object.assign(userDto, { password: passwordHash });
    return this.usersService.create(userDto);
  }

  async signIn(userDto: Partial<User>) {
    const [user] = await this.usersService.findAll(userDto.email);
    if (!user) throw new NotFoundException('user not found');
    const [salt, hash] = user.password.split('.');
    const incomingPasswordHash = (await scrypt(userDto.password, salt, 32)) as Buffer;
    if (incomingPasswordHash.toString('hex') === hash) {
      return user;
    }
    throw new UnauthorizedException('incorrect email and/or password');
  }
}
