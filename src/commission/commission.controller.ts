import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Commission, RefereeCommission } from '@prisma/client';
import { FinanceStatusEnum } from 'src/common/finance-status.enum';
import { CommissionService } from './commission.service';
import { AddCommissionDto } from './dto/Add-commission.dto';

@Controller('/api/commissions')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Post()
  addCommission(@Body() addCommissionDto: AddCommissionDto) {
    return this.commissionService.createCommission(addCommissionDto);
  }

  @Get()
  getCommissions() {
    return this.commissionService.getCommissions();
  }

  @Get(':id')
  getSingleCommission(@Param('id') id: number) {
    return this.commissionService.getSingleCommission(id);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: number,
    @Query('status') status: FinanceStatusEnum,
  ) {
    return this.commissionService.updateStatus(id, status);
  }

  @Put()
  async updateCommission(@Body() data: RefereeCommission[]) {
    await this.commissionService.updateCommission(data);
  }

  @Delete(':commissionId/referees/:refereeId')
  removeReferee(
    @Param('commissionId') commissionId: number,
    @Param('refereeId') refereeId: number,
  ) {
    return this.commissionService.removeReferee(commissionId, refereeId);
  }
}
