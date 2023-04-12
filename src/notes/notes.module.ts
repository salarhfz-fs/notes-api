import { Module } from '@nestjs/common';

import {NotesFileRepository} from './notes-file.repository';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesFileRepository]
})
export class NotesModule {}
