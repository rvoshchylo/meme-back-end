import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(userName: string): Promise<{ accessToken: string }> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { name: userName },
      });

      const user = existingUser
        ? existingUser
        : await this.prisma.user.create({ data: { name: userName } });

      if (!user || !user.id) {
        throw new BadRequestException('Invalid user');
      }

      const payload = {
        sub: user.id,
        name: user.name,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '7d',
      });

      return { accessToken };
    } catch (error: any) {
      console.error('Login error:', error);
      throw new BadRequestException('Login failed');
    }
  }
}
