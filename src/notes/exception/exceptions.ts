import { HttpException, HttpStatus } from '@nestjs/common';

export const InvalidIdException = new HttpException(
  'Invalid note ID input',
  HttpStatus.BAD_REQUEST,
);

export const NoteNotFoundException = new HttpException(
  'Note not found',
  HttpStatus.NOT_FOUND,
);
