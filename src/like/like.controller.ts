import { Controller, Post, Param, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { AccessTokenGuard } from 'src/guards/access-token.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AccessTokenGuard)
  @Post(':id/like')
  toggleLike(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.likeService.toggleLike(req.user['sub'], id);
  }
}
