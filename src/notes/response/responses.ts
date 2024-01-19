import { HttpStatus } from '@nestjs/common';
import { Note, NoteResponse, NotesResponse } from '../shape';

export const noteResponse = (message: string, data: Note): NoteResponse => ({
  status: HttpStatus.OK,
  message,
  data,
});

export const notesResponse = (
  message: string,
  data: Note[],
): NotesResponse => ({
  status: HttpStatus.OK,
  message,
  data,
});
