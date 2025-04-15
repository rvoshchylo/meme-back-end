import { Module } from '@nestjs/common';
import { LikeModule } from './like/like.module';
import { ConfigModule } from '@nestjs/config';
import { MemesModule } from './memes/memes.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LikeModule,
    MemesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
