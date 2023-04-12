import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
  getNote(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Post()
  createNote(@Body() body: CreateNoteDto) {
    return this.notesService.create(body.content);
  }
}

