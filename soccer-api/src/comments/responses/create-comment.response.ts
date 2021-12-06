import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentResponse {
  @ApiProperty({
    type: String,
    description: 'Comment description.',
    example: 'pitido inicial',
  })
  description: string;

  @ApiProperty({
    type: Date,
    description: 'Comment creation date.',
    example: new Date(),
  })
  createdAt: Date;
}
