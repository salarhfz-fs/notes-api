import {Injectable} from "@nestjs/common";
import { readFile, writeFile } from 'fs/promises';

import {INotesRepository} from "./interfaces/notes-repository.interface";
import {Note} from "./models/note.model";

@Injectable()
export class NotesFileRepository implements INotesRepository{
  private static readonly NOTES_FILE = 'notes.json';

  async findOne(id: string) {
    const notes = await readFile(NotesFileRepository.NOTES_FILE, 'utf8');
    const notesJson = (JSON.parse(notes)) as Array<Note>;
    return notesJson.find(note => note.id === id);
  }

  async findAll() {
    const notes = await readFile(NotesFileRepository.NOTES_FILE, 'utf8');
    return (JSON.parse(notes)) as Array<Note>
  }

  async create(content: string) {
    const notes = await readFile(NotesFileRepository.NOTES_FILE, 'utf8');
    const notesJson = (JSON.parse(notes)) as Array<Note>;

    const newNote = { id: new Date().getTime().toString(), content };
    notesJson.push(newNote);

    await writeFile(NotesFileRepository.NOTES_FILE, JSON.stringify(notesJson), 'utf8');
    return newNote;
  }
}
