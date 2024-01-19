import type { HttpStatus } from '@nestjs/common';

export interface Note {
  id: number;
  title: string;
  body: string;
}

export type NoteInput = Pick<Note, 'title' | 'body'>;

export interface NotesWithSelectedNote {
  notes: Note[];
  selectedNote?: Note;
}

export interface GenericResponse<T> {
  status: HttpStatus;
  message: string;
  data: T;
}

export type NoteResponse = GenericResponse<Note>;

export type NotesResponse = GenericResponse<Note[]>;
