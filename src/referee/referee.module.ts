import { Module } from '@nestjs/common';
import { RefereeController } from './referee.controller';
import { RefereeService } from './referee.service';

@Module({
  controllers: [RefereeController],
  providers: [RefereeService],
})
export class RerefeeModule {}
