import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { RerefeeModule } from './referee/referee.module';
import { CommissionerModule } from './commissioner/commissioner.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    PrismaModule,
    GameModule,
    RerefeeModule,
    CommissionerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
