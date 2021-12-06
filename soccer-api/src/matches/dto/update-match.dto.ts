import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Team one name',
    example: 'sample team 1',
  })
  teamOne: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Team two name',
    example: 'sample team 2',
  })
  teamTwo: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Team one score',
    example: 0,
  })
  scoreTeamOne: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Team two score',
    example: 0,
  })
  scoreTeamTwo: number;
}
