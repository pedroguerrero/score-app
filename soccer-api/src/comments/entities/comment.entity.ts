import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Match } from '../../matches/entities/match.entity';

@Entity({ name: 'comments' })
export class Comment {
  @ApiProperty({
    type: String,
    description: 'Comment id',
    example: '996829dc-4ae6-4f32-a6ed-c1c77b8d93d1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'Comment description',
    example: 'pitidio inicial',
  })
  @Column()
  description: string;

  @ApiProperty({
    type: Date,
    description: 'Comment creation date',
    example: new Date(),
  })
  @CreateDateColumn()
  createdAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((match) => Match, (match) => match.comments)
  match: Match;
}
