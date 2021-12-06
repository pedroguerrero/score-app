import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @ApiProperty({
    type: String,
    description: 'User id',
    example: '996829dc-4ae6-4f32-a6ed-c1c77b8d93d1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'sample',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: 'sample',
  })
  @Column()
  password: string;
}
