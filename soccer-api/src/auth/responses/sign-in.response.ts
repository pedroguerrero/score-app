import { ApiProperty } from '@nestjs/swagger';

export class SingInResponse {
  @ApiProperty({
    type: String,
    description: 'Jwt token',
    example: 'sampleToken',
  })
  accessToken: string;
}
