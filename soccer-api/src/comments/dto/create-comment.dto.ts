import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    type: String,
    description: 'Comment description',
    example: 'pitido inicial',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
