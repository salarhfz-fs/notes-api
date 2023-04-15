import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {Note} from './notes/models/note.entity';
import { NotesModule } from './notes/notes.module';
import {User} from './users/models/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
   type: 'sqlite',
   database: 'db.sqlite',
   entities: [Note, User],
   synchronize: true,
  }),
  NotesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
