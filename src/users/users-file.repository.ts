import {Injectable} from "@nestjs/common";
import { readFile, writeFile } from 'fs/promises';

import {IRepository} from "src/interfaces/repository.interface";
import {User} from "./models/user.model";

@Injectable()
export class UsersFileRepository implements IRepository<User> {
  private static readonly USERS_FILE = 'users.json';

  async findOne(id: string) {
    const users = await readFile(UsersFileRepository.USERS_FILE, 'utf8');
    const usersJson = (JSON.parse(users)) as Array<User>;
    return usersJson.find(user => user.id === id);
  }

  async findAll() {
    const users = await readFile(UsersFileRepository.USERS_FILE, 'utf8');
    return (JSON.parse(users)) as Array<User>
  }

  async create(user: Partial<User>) {
    const users = await readFile(UsersFileRepository.USERS_FILE, 'utf8');
    const usersJson = (JSON.parse(users)) as Array<User>;

    const { firstName, lastName } = user;
    const newUser = { id: new Date().getTime().toString(), firstName, lastName };
    usersJson.push(newUser);

    await writeFile(UsersFileRepository.USERS_FILE, JSON.stringify(usersJson), 'utf8');
    return newUser;
  }
}
