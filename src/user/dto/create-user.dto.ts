import { RoleType } from 'src/common/role.enum';

export class CreateUserDto {
  username: string;
  role: RoleType;
}
