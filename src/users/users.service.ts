import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {Repository} from 'typeorm';
import {User} from './models/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  create(userDto: Partial<User>) {
    const user = this.usersRepo.create(userDto);
    return this.usersRepo.save(user);
  }

  async findOne(id: string) {
    const user = await this.usersRepo.findOneBy({ id });
    return user;
  }

  async findAll(email: string) {
    const searchCriteria = { ...( email && {email})};
    const users = await this.usersRepo.findBy(searchCriteria);
    return users;
  }

  async update(id: string, userDto: Partial<User>) {
    const user = await this.findOne(id);
    if (user) {
      Object.assign(user, userDto);
      return this.usersRepo.save(user);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      return this.usersRepo.remove(user);
    }
  }
}
