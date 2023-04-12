import { Note } from "../models/note.model";

export interface INotesRepository {
  findOne(id: string): Promise<Note>;
  findAll(): Promise<Note[]>;
  create(content: string): Promise<Note>;
}

