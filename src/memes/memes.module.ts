import { Module } from '@nestjs/common';
import { MemesService } from './memes.service';
import { MemesController } from './memes.controller';

@Module({
  controllers: [MemesController],
  providers: [MemesService],
})
export class MemesModule {}
