import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Note} from './models/note.entity';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports:[TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
