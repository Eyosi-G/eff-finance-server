import { LeagueType } from 'src/common/league.enum';

export class UpdateCommissonerDto {
  readonly firstName?: string;
  readonly middleName?: string;
  readonly lastName?: string;
  readonly phoneNumber?: string;
  readonly accountNumber?: string;
  readonly initial?: string;
  readonly league?: LeagueType;
}
