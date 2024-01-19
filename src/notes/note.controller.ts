import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Note, NoteResponse, NotesResponse } from './shape';
import { NoteService } from './note.service';
import { noteResponse, notesResponse } from './response';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async getAll(): Promise<NotesResponse> {
    const notes = await this.noteService.getAll();
    return notesResponse('Notes retrieved successfully', notes);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<NoteResponse> {
    const { selectedNote } = await this.noteService.get(id);
    return noteResponse('Note retrieved successfully', selectedNote);
  }

  @Post()
  async create(@Body() note: Note): Promise<NoteResponse> {
    return await this.noteService.create(note);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() note: Note,
  ): Promise<NoteResponse> {
    return await this.noteService.update(id, note);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<NoteResponse> {
    return await this.noteService.delete(id);
  }
}
