import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommissionerService } from './commissioner.service';
import { CreateCommissonerDto } from './dto/create-commissioner.dto';
import { UpdateCommissonerDto } from './dto/update-commissioner.dto';

@Controller('/commissioners')
export class CommissionerController {
  constructor(private readonly commissionerService: CommissionerService) {}

  @Post()
  createCommissioner(@Body() createCommissionerDto: CreateCommissonerDto) {
    return this.commissionerService.createCommissioner(createCommissionerDto);
  }

  @Patch(':id')
  updateCommissioner(
    @Body() data: UpdateCommissonerDto,
    @Param('id') id: number,
  ) {
    return this.commissionerService.updateCommissioner(id, data);
  }

  @Patch(':id')
  deleteCommissioner(@Param('id') id: number) {
    return this.commissionerService.deleteCommissioner(id);
  }

  @Get()
  getCommissioners(@Query('name') name?: string) {
    return this.commissionerService.getCommissioners(name);
  }

  @Get(":id")
  getSingeCommissioner(@Param('id') id: number) {
    return this.commissionerService.getSingeCommissioner(id);
  }
}
