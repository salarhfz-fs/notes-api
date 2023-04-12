import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateNoteDto } from './dtos/create-note.dto';

@Controller('notes')
export class NotesController {
  @Get()
  listNotes() {
    return 'All notes';
  }

  @Get('/:id')
  getNote(@Param('id') id: string) {
    return `Note by ID, ${id}`;
  }

  @Post()
  createNote(@Body() body: CreateNoteDto) {
    return `Create a new note, ${JSON.stringify(body)}`;
  }
}

