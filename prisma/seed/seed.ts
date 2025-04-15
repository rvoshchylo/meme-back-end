import { PrismaClient } from '@prisma/client';
import { readdirSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const publicDir = join(__dirname, '../..', 'public');

  await prisma.like.deleteMany();
  await prisma.meme.deleteMany();
  console.log('🗑️ Cleared existing memes');

  const files = readdirSync(publicDir).filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file),
  );

  if (files.length === 0) {
    console.warn('⚠️ No images found in /public');
    return;
  }

  for (const file of files) {
    const name = file.split('.')[0].replace(/[-_]/g, ' ');
    const image = `${baseUrl}/${file}`;
    const likes = Math.floor(Math.random() * 100);

    await prisma.meme.create({
      data: {
        name,
        image,
        likes,
      },
    });

    console.log(`✅ Seeded meme: ${name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
