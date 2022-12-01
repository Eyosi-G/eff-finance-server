import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const seed = async () => {
  const client = new PrismaClient();
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
  await client.user.create({
    data: {
      username: process.env.ADMIN_USERNAME,
      password: hashed,
      role: "ADMIN",
    },
  });
  console.log('admin created');
};

seed();
