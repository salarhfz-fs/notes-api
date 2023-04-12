import { Controller, Get, Post } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  @Get()
  listNotes() {
    return 'All notes';
  }

  @Get('/:id')
  getNote() {
    return 'Note by ID';
  }

  @Post()
  createNote() {
    return 'Create a new note';
  }
}

