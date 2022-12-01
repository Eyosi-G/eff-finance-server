import { LeagueType } from 'src/common/league.enum';
import { RefereeType } from 'src/common/referee.enum';

export class CreateRefereeDto {
  readonly firstName: string;
  readonly middleName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly accountNumber: string;
  readonly initial: string;
  readonly league: LeagueType;
  readonly type: RefereeType;
}
