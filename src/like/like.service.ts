import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async toggleLike(userId: string, memeId: string) {
    const existing = await this.prisma.like.findUnique({
      where: { userId_memeId: { userId, memeId } },
    });

    if (existing) {
      await this.prisma.like.delete({ where: { id: existing.id } });
      await this.prisma.meme.update({
        where: { id: memeId },
        data: { likes: { decrement: 1 } },
      });
      return { liked: false };
    }

    await this.prisma.like.create({ data: { userId, memeId } });
    await this.prisma.meme.update({
      where: { id: memeId },
      data: { likes: { increment: 1 } },
    });
    return { liked: true };
  }
}
