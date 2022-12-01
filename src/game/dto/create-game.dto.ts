import { LeagueType } from 'src/common/league.enum';

export class CreateGameDto {
  readonly league: LeagueType;
  readonly mainRefereeId: number;
  readonly assistanceRefereeOneId: number;
  readonly assistanceRefereeTwoId: number;
  readonly fourthRefereeId: number;
  readonly commissionerId: number;
  readonly match: string;
  readonly destination: string;
}
