import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsernameOrEmail(username: string, email: string) {
    return this.prisma.users.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async createUser(data: {
    username: string;
    email: string;
    name: string;
    password: string;
  }) {
    return this.prisma.users.create({ data });
  }

  async getUserProfile(userId: number) {
    return this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        username: true,
        name: true,
        email: true,
      },
    });
  }
}
