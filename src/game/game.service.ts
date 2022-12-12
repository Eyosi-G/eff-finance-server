import { ConflictException, Injectable } from '@nestjs/common';
import { FinanceDataStatus } from '@prisma/client';
import { FinanceStatusEnum } from 'src/common/finance-status.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}
  createGame(data: CreateGameDto) {
    return this.prismaService.game.create({
      data: {
        ...data,
      },
    });
  }
  async updateGame(id: number, data: UpdateGameDto) {
    const game = await this.prismaService.game.findUnique({
      where: {
        id,
      },
    });

    if (game.status !== FinanceDataStatus.OPEN) {
      throw new ConflictException();
    }

    return this.prismaService.game.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });
  }

  async updateFinanceData(gameId: number, data: UpdateFinanceDto) {
    let game = await this.prismaService.game.findUnique({
      where: {
        id: gameId,
      },
    });
    if (
      !(
        game.status == FinanceStatusEnum.OPEN ||
        game.status == FinanceDataStatus.REJECTED
      )
    ) {
      throw new ConflictException();
    }

    game = await this.prismaService.game.update({
      data: {
        ...data,
      },
      where: {
        id: gameId,
      },
    });

    await this.prismaService.game.update({
      where: {
        id: gameId,
      },
      data: {
        mainRefereeTotalComission:
          game.mainRefereeComissionPerDay.toNumber() *
          (game.mainRefereeNumberOfDays +
            game.mainRefereeTransportComission.toNumber() +
            game.mainRefereeTalentComission.toNumber()),

        assistanceRefereeOneTotalComission:
          game.assistanceRefereeOneNumberOfDays *
          (game.assistanceRefereeOneComissionPerDay.toNumber() +
            game.assistanceRefereeOneTransportComission.toNumber() +
            game.assistanceRefereeOneTalentComission.toNumber()),

        assistanceRefereeTwoTotalComission:
          game.assistanceRefereeTwoNumberOfDays *
          (game.assistanceRefereeTwoComissionPerDay.toNumber() +
            game.assistanceRefereeTwoTalentComission.toNumber() +
            game.assistanceRefereeTwoTransportComission.toNumber()),
        fourthRefereeTotalComission:
          game.fourthRefereeNumberOfDays *
          (game.fourthRefereeComissionPerDay.toNumber() +
            game.fourthRefereeTalentComission.toNumber() +
            game.fourthRefereeTransportComission.toNumber()),
        commissionerTotalComission:
          game.commissionerNumberOfDays *
          (game.commissionerComissionPerDay.toNumber() +
            game.commissionerTransportComission.toNumber() +
            game.commissionerTalentComission.toNumber()),
      },
    });
  }

  getGames() {
    return this.prismaService.game.findMany({
      include: {
        assistantRefereeOne: true,
        assistantRefereeTwo: true,
        commissioner: true,
        fourthReferee: true,
        mainReferee: true,
      },
    });
  }

  getGame(id: number) {
    return this.prismaService.game.findUnique({
      include: {
        assistantRefereeOne: true,
        assistantRefereeTwo: true,
        commissioner: true,
        fourthReferee: true,
        mainReferee: true,
      },
      where: {
        id,
      },
    });
  }

  approveStatus(id: number) {
    return this.prismaService.game.update({
      data: {
        status: FinanceDataStatus.APPROVED,
      },
      where: {
        id,
      },
    });
  }

  rejectStatus(id: number, reason?: string) {
    return this.prismaService.game.update({
      data: {
        status: FinanceDataStatus.REJECTED,
        rejectionReason: reason,
      },
      where: {
        id,
      },
    });
  }

  submitForApproval(id: number) {
    return this.prismaService.game.update({
      data: {
        status: FinanceDataStatus.PENDDING,
      },
      where: {
        id,
      },
    });
  }
}
