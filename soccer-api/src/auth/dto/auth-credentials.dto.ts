import { string } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: string,
    description: 'Email to register',
    example: 'sample@sample.com',
  })
  email: string;

  @IsNotEmpty()
  @Length(8)
  @ApiProperty({
    type: string,
    description: 'Password to register',
    example: 'SamplePassword123',
  })
  password: string;
}
