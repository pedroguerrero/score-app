import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Team one name',
    example: 'sample team 1',
  })
  teamOne: string;

  @ApiProperty({
    type: String,
    description: 'Team two name',
    example: 'sample team 2',
  })
  @IsNotEmpty()
  @IsString()
  teamTwo: string;
}
