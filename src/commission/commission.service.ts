import { Injectable } from '@nestjs/common';
import { RefereeCommission } from '@prisma/client';
import { FinanceStatusEnum } from 'src/common/finance-status.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCommissionDto } from './dto/Add-commission.dto';

@Injectable()
export class CommissionService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCommission(addCommissionDto: AddCommissionDto) {
    console.log(addCommissionDto);
    const commission = await this.prismaService.commission.create({
      data: {
        league: addCommissionDto.leageue,
      },
    });
    addCommissionDto.refereesId.map(async (refereeId) => {
      await this.prismaService.refereeCommission.create({
        data: {
          commissionId: commission.id,
          refereeId: refereeId,
        },
      });
    });
  }

  updateStatus(commissionId: number, status: FinanceStatusEnum) {
    return this.prismaService.commission.update({
      where: {
        id: commissionId,
      },
      data: {
        status,
      },
    });
  }

  removeReferee(commissionId: number, refereeId: number) {
    return this.prismaService.refereeCommission.deleteMany({
      where: {
        AND: [{ commissionId, refereeId }],
      },
    });
  }

  getCommissions() {
    return this.prismaService.commission.findMany({
      include: {
        refereeCommissions: {
          include: {
            referee: true,
          },
        },
      },
    });
  }

  getSingleCommission(id: number) {
    return this.prismaService.commission.findUnique({
      where: {
        id,
      },
      include: {
        refereeCommissions: {
          include: {
            referee: true,
          },
        },
      },
    });
  }

  async updateCommission(refereeCommissions: RefereeCommission[]) {
    await Promise.all(
      refereeCommissions.map(async (refereeCommission) => {
        const totalCommission =
          Number(refereeCommission.numberOfDays) *
          (Number(refereeCommission.talentCommission) +
            Number(refereeCommission.transportCommission) +
            Number(refereeCommission.commissionPerDay));

        return await this.prismaService.refereeCommission.update({
          where: {
            id: refereeCommission.id,
          },
          data: {
            numberOfDays: refereeCommission.numberOfDays,
            talentCommission: refereeCommission.talentCommission,
            totalCommission,
            transportCommission: refereeCommission.transportCommission,
            commissionPerDay: refereeCommission.commissionPerDay,
          },
        });
      }),
    );
  }
}
