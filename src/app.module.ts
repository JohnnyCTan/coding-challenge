import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './notes';

@Module({
  imports: [NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
