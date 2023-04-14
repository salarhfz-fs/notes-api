import { Injectable } from '@nestjs/common';

import {CrudService} from 'src/common/crud-service.service';
import {Note} from './models/note.model';
import {NotesFileRepository} from './notes-file.repository';

@Injectable()
export class NotesService extends CrudService<Note> {

  constructor(private notesFileRepository: NotesFileRepository) {
    super(notesFileRepository);
  }

}
