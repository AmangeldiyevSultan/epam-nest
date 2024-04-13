import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'test@example.com',
  })
  username: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'Qwerty123!',
  })
  password: string;
}
