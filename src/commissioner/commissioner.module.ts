import { Module } from '@nestjs/common';
import { CommissionerController } from './commissioner.controller';
import { CommissionerService } from './commissioner.service';

@Module({
  controllers: [CommissionerController],
  providers: [CommissionerService],
})
export class CommissionerModule {}
