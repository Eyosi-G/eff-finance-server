import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRefereeDto } from './dto/create-referee.dto';
import { UpdateRefereeDto } from './dto/update-referee.dto';
import { RefereeService } from './referee.service';

@Controller('/api/referees')
export class RefereeController {
  constructor(private readonly refereeService: RefereeService) {}
  @Post()
  createReferee(@Body() data: CreateRefereeDto) {
    return this.refereeService.createReferee(data);
  }

  @Patch(':id')
  updateReferee(@Body() data: UpdateRefereeDto, @Param('id') id: number) {
    return this.refereeService.updateReferee(id, data);
  }

  @Delete(':id')
  deleteReferee(@Param('id') id: number) {
    return this.refereeService.deleteReferee(id);
  }

  @Get()
  getReferees(@Query('name') name?: string) {
    return this.refereeService.getReferees(name);
  }
  @Get(':id')
  getSingleReferee(@Param('id') id: number) {
    return this.refereeService.getSingleReferee(id);
  }
}
