import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { InvalidIdException, NoteNotFoundException } from './exception';
import { Note, NoteInput, NoteResponse, NotesWithSelectedNote } from './shape';
import { noteResponse } from './response';

@Injectable()
export class NoteService {
  private readonly _notesDir = 'src/data/notes.json';

  async getAll(): Promise<Note[]> {
    let notes = [];
    try {
      const data = await fs.readFile(this._notesDir, 'utf-8');
      notes = JSON.parse(data);
    } catch (err) {
      // if file not found, return empty array, else throw the error
      if (err.code !== 'ENOENT') throw err;
    }
    return notes;
  }

  async get(id?: string): Promise<NotesWithSelectedNote> {
    try {
      const notes = await this.getAll();
      const noteId = parseInt(id);
      let obj: NotesWithSelectedNote = { notes };

      if (isNaN(noteId)) throw InvalidIdException;

      const note = notes.find((n) => n.id === noteId);

      if (!note) throw NoteNotFoundException;

      obj.selectedNote = note;
      return obj;
    } catch (err) {
      throw err;
    }
  }

  async create(newNote: NoteInput): Promise<NoteResponse> {
    try {
      const notes = await this.getAll();
      const note = {
        id: (notes[notes.length - 1]?.id ?? 0) + 1,
        ...newNote,
      };

      const updatedNotes = [...notes, note];
      await fs.writeFile(this._notesDir, JSON.stringify(updatedNotes, null, 2));

      return noteResponse('Note created successfully', note);
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, newNote: NoteInput): Promise<NoteResponse> {
    try {
      const { notes, selectedNote } = await this.get(id);
      const note = {
        ...selectedNote,
        ...newNote,
      };

      const updatedNotes = [...notes.filter((n) => n.id !== note.id), note];

      await fs.writeFile(this._notesDir, JSON.stringify(updatedNotes, null, 2));

      return noteResponse('Note updated successfully', note);
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<NoteResponse> {
    try {
      const { notes, selectedNote: note } = await this.get(id);
      const updatedNotes = notes.filter((n) => n.id !== note.id);
      await fs.writeFile(this._notesDir, JSON.stringify(updatedNotes, null, 2));

      return noteResponse('Note deleted successfully.', note);
    } catch (err) {
      throw err;
    }
  }
}
