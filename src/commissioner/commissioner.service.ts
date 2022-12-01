import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommissonerDto } from './dto/create-commissioner.dto';
import { UpdateCommissonerDto } from './dto/update-commissioner.dto';

@Injectable()
export class CommissionerService {
  constructor(private prismaService: PrismaService) {}

  createCommissioner(createCommissionerDto: CreateCommissonerDto) {
    return this.prismaService.commissioner.create({
      data: {
        ...createCommissionerDto,
      },
    });
  }

  updateCommissioner(id: number, data: UpdateCommissonerDto) {
    return this.prismaService.commissioner.update({
      data: {
        ...data,
      },
      where: {
        id: id,
      },
    });
  }

  deleteCommissioner(id: number) {
    return this.prismaService.commissioner.delete({
      where: {
        id,
      },
    });
  }

  getCommissioners(name?: string) {
    if (!name) {
      return this.prismaService.commissioner.findMany();
    }
    return this.prismaService.commissioner.findMany({
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

  getSingeCommissioner(id: number) {
    return this.prismaService.commissioner.findUnique({
      where: { id },
    });
  }
}
