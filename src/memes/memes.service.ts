import { Injectable } from '@nestjs/common';
import { UpdateMemeDto } from './dto/update-meme.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const [memes, likes] = await Promise.all([
      this.prisma.meme.findMany({
        orderBy: { id: 'asc' },
      }),
      this.prisma.like.findMany({
        where: { userId },
        select: { memeId: true },
      }),
    ]);

    const likedMap = new Set(likes.map((like) => like.memeId));

    return memes.map((meme) => ({
      ...meme,
      isLiked: likedMap.has(meme.id),
    }));
  }

  async update(id: string, dto: UpdateMemeDto) {
    return this.prisma.meme.update({
      where: { id },
      data: dto,
    });
  }
}
