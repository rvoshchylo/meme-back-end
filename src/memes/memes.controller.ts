import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MemesService } from './memes.service';
import { UpdateMemeDto } from './dto/update-meme.dto';
import { AccessTokenGuard } from 'src/guards/access-token.guard';

@Controller('memes')
export class MemesController {
  constructor(private readonly memesService: MemesService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Req() req: { user: { id: string } }) {
    const { user } = req;

    return this.memesService.findAll(user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemeDto) {
    return this.memesService.update(id, dto);
  }
}
