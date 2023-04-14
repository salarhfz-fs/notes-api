import { Module } from '@nestjs/common';

import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NotesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
