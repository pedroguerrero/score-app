import { EntityRepository, Repository } from 'typeorm';
import { Match } from '../../matches/entities/match.entity';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async createComment(
    createCommentDto: CreateCommentDto,
    match: Match,
  ): Promise<Comment> {
    const comment = this.create({ ...createCommentDto, match });

    return this.save(comment);
  }
}
