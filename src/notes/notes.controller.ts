import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';

import { CreateNoteDto } from './dtos/create-note.dto';
import {NotesService} from './notes.service';

@Controller('notes')
export class NotesController {

  constructor(private notesService: NotesService) {}

  @Get()
  listNotes() {
    return this.notesService.findAll();
  }

  @Get('/:id')
  async getNote(@Param('id') id: string) {
    const note = await this.notesService.findOne(id);
    if (!note) throw new NotFoundException('note not found');
    return note;
  }

  @Post()
  createNote(@Body() body: CreateNoteDto) {
    return this.notesService.create(body.content);
  }
}

