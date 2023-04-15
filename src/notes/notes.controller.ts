import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';

import { CreateNoteDto } from './dtos/create-note.dto';
import {UpdateNoteDto} from './dtos/update-note.dto';
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
    return this.notesService.create(body);
  }

  @Patch('/:id')
  updateNote(@Param('id') id: string, @Body() body: UpdateNoteDto) {
    return this.notesService.update(id, body);
  }

  @Delete('/:id')
  removeNote(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}

