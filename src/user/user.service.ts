import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Role, User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(data: CreateUserDto) {
    const defaultPassword = this.configService.get('DEFAULT_PASSWORD');
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(defaultPassword, salt);
    await this.prismaService.user.create({
      data: {
        password: hash,
        username: data.username,
        role: data.role,
      },
    });
  }

  getUsers(user: User) {
    if (user.role === Role.ADMIN) {
      return this.prismaService.user.findMany({
        select: {
          id: true,
          username: true,
          role: true,
        },
        where: {
          role: {
            in: [
              Role.COMPETITION_MANAGER,
              Role.FINANCE_MANAGER,
              Role.REFEREE_MANAGER,
            ],
          },
        },
      });
    }
    if (user.role === Role.FINANCE_MANAGER) {
      return this.prismaService.user.findMany({
        select: {
          id: true,
          username: true,
          role: true,
        },
        where: {
          role: Role.FINANCE_EMPLOYEE,
        },
      });
    }
    throw new UnauthorizedException();
  }

  deleteUser(id: number) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
