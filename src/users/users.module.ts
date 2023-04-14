import { Module } from '@nestjs/common';

import {UsersFileRepository} from './users-file.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersFileRepository]
})
export class UsersModule {}
