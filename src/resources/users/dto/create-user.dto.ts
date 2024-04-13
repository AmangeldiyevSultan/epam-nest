import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/utils/enums";

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'username',
  })
  username: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'Qwerty123!',
  })
  password: string;

  @ApiProperty({
    description: 'The role for the user account',
    enum: UserRole,
    example: `${UserRole.KAZAKH} || ${UserRole.KAZAKHTANI} || ${UserRole.NON_KAZAKHSTANI}`,
  })
  role: UserRole;
}
