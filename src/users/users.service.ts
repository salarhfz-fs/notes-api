import { Injectable } from '@nestjs/common';

import {CrudService} from 'src/common/crud-service.service';
import {User} from './models/user.model';
import {UsersFileRepository} from './users-file.repository';

@Injectable()
export class UsersService extends CrudService<User> {

  constructor(private usersFileRepository: UsersFileRepository) {
    super(usersFileRepository);
  }

}
