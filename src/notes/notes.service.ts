import { Injectable } from '@nestjs/common';
import {Note} from './models/note.model';
import {NotesFileRepository} from './notes-file.repository';

@Injectable()
export class NotesService {

  constructor(private notesFileRepository: NotesFileRepository) {}

  findOne(id: string): Promise<Note> {
    return this.notesFileRepository.findOne(id)
  }

  findAll(): Promise<Array<Note>> {
    return this.notesFileRepository.findAll();
  }

  create(content: string): Promise<Note> {
    return this.notesFileRepository.create(content);
  }
}
