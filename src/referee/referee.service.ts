import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRefereeDto } from './dto/create-referee.dto';
import { UpdateRefereeDto } from './dto/update-referee.dto';

@Injectable()
export class RefereeService {
  constructor(private prismaService: PrismaService) {}

  createReferee(createRefereeDto: CreateRefereeDto) {
    return this.prismaService.referee.create({
      data: {
        ...createRefereeDto,
      },
    });
  }

  updateReferee(id: number, data: UpdateRefereeDto) {
    return this.prismaService.referee.update({
      data: {
        ...data,
      },
      where: {
        id: id,
      },
    });
  }

  deleteReferee(id: number) {
    return this.prismaService.referee.delete({
      where: {
        id,
      },
    });
  }

  getReferees(name?: string) {
    if (!name) {
      return this.prismaService.referee.findMany();
    }
    return this.prismaService.referee.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: name,
            },
          },
          {
            middleName: {
              contains: name,
            },
          },
          {
            lastName: {
              contains: name,
            },
          },
        ],
      },
    });
  }

  getSingleReferee(id: number) {
    return this.prismaService.referee.findUnique({ where: { id } });
  }
}
