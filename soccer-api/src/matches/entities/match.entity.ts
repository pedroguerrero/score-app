import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity({ name: 'matches' })
export class Match {
  @ApiProperty({
    type: String,
    description: 'Match id',
    example: '996829dc-4ae6-4f32-a6ed-c1c77b8d93d1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'Team one name',
    example: 'sample team name 1',
  })
  @Column()
  teamOne: string;

  @ApiProperty({
    type: String,
    description: 'Team two name',
    example: 'sample team name 2',
  })
  @Column()
  teamTwo: string;

  @ApiProperty({
    type: Number,
    description: 'Team one score',
    example: 0,
  })
  @Column({
    default: 0,
  })
  scoreTeamOne: number;

  @ApiProperty({
    type: Number,
    description: 'Team two score',
    example: 0,
  })
  @Column({
    default: 0,
  })
  scoreTeamTwo: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((comment) => Comment, (comment) => comment.match)
  comments: Comment[];
}
