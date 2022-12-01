import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: loginDto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Wrong Credentials');
    }
    const isCorrect = await bcrypt.compare(loginDto.password, user.password);
    if (!isCorrect) {
      throw new UnauthorizedException('Wrong Credentials');
    }
    const payload = { id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: this.configService.get('SECRET'),
    });
    return {
      accessToken: `Bearer ${accessToken}`,
      role: user.role,
      id: user.id,
    };
  }
}
