import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {Note} from './models/note.entity';

@Injectable()
export class NotesService {

  constructor(@InjectRepository(Note) private notesRepo: Repository<Note>) {}

  create(noteDto: Partial<Note>) {
    const note = this.notesRepo.create(noteDto);
    return this.notesRepo.save(note);
  }

  async findOne(id: string) {
    const note = await this.notesRepo.findOneBy({ id });
    if (!note) throw new NotFoundException('note not found');
    return note;
  }

  async findAll() {
    const notes = await this.notesRepo.find();
    if (notes?.length < 1) throw new NotFoundException('note(s) not found');
    return notes;
  }

  async update(id: string, noteDto: Partial<Note>) {
    const note = await this.findOne(id);
    if (note) {
      Object.assign(note, noteDto);
      return this.notesRepo.save(note)
    }
  }

  async remove(id: string) {
    const note = await this.findOne(id);
    if (note) {
      return this.notesRepo.remove(note);
    }
  }
}
